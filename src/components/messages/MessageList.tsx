import { User } from 'lucide-react';
import { getMessages, Message } from '@/utils/firebasedb';
import { useEffect, useState } from 'react';

interface MessageListProps {
  limit?: number;
}

export function MessageList({ limit }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const recentMessages = await getMessages(limit); // 최근 3개의 메시지만 가져오기
        setMessages(recentMessages);
      } catch (error) {
        console.error('Error fetching recent messages:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className='text-center text-gray-600'>메시지를 불러오는 중...</div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className='text-center text-gray-600'>아직 메시지가 없습니다.</div>
    );
  }

  return (
    <div className='space-y-4'>
      {messages.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </div>
  );
}

interface MessageCardProps {
  message: Message;
}

function MessageCard({ message }: MessageCardProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-gray-800 mb-2'>{message.content}</p>
          <div className='flex items-center justify-between w-full'>
            <p className='text-sm text-indigo-600 flex items-center'>
              <User className='mr-1' size={16} /> {message.name}
            </p>
            {message.createdAt && (
              <p className='text-sm text-gray-500'>
                {new Date(message.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
