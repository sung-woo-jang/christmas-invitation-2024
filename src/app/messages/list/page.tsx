'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, User } from 'lucide-react';
import { Message, getMessages } from '@/utils/firebasedb';

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-4xl font-bold text-center text-indigo-600 mb-8'>
        축복 메시지 목록
      </h1>
      {loading ? (
        <div className='text-center'>
          <p className='text-gray-600'>메시지를 불러오는 중...</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {messages.map((message) => (
            <div
              key={message.id}
              className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300'
            >
              <div className='flex items-start justify-between'>
                <div>
                  <p className='text-gray-800 mb-2'>{message.content}</p>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm text-indigo-600 flex items-center'>
                      <User className='mr-1' size={16} /> {message.name}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {new Date(message.createdAt || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
