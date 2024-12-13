import { Trash2, User, X } from 'lucide-react';
import { deleteMessage, getMessages, Message } from '@/utils/firebasedb';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DeleteConfirmModal } from '@/components/messages/DeleteConfirmModal';

interface MessageListProps {
  reRenderKey?: number;
  limit?: number;
}

export function MessageList({ limit, reRenderKey }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const recentMessages = await getMessages(limit);
      setMessages(recentMessages);
    } catch (error) {
      console.error('Error fetching recent messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [reRenderKey]);

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
        <MessageCard
          key={message.id}
          message={message}
          onDelete={fetchMessages}
        />
      ))}
    </div>
  );
}

interface MessageCardProps {
  message: Message;
  onDelete: () => void;
}

function MessageCard({ message, onDelete }: MessageCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async (password: string) => {
    if (!message.id) return;

    try {
      const result = await deleteMessage(message.id, password);
      if (result.success) {
        alert('메시지가 삭제되었습니다.');
        onDelete(); // 메시지 목록 새로고침
      } else {
        alert(result.error || '메시지 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('메시지 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
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
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setIsDeleteModalOpen(true)}
          className='ml-4 text-gray-400 hover:text-red-500 transition-colors'
          title='메시지 삭제'
        >
          <Trash2 size={20} />
        </Button>
      </div>
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
