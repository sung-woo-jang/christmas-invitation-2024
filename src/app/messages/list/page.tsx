'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { getMessages, Message } from '@/utils/firebasedb';
import { MessageList } from '@/components/messages/MessageList';

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const recentMessages = await getMessages(3); // 최근 3개의 메시지만 가져오기
        setMessages(recentMessages);
      } catch (error) {
        console.error('Error fetching recent messages:', error);
      } finally {
        setInitialLoading(false);
      }
    })();
  }, []);

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-4xl font-bold text-center text-indigo-600 mb-8'>
        축복 메시지 목록
      </h1>
      <MessageList messages={messages} loading={initialLoading} />
      <div className='mt-8 text-center'>
        <Link
          href='/messages'
          className='inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md'
        >
          <MessageCircle className='mr-2' /> 새 메시지 작성하기
        </Link>
      </div>
    </div>
  );
}
