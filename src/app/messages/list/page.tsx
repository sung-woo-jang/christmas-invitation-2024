'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, User } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  name: string;
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 애플리케이션에서는 여기서 API를 호출하여 메시지를 가져옵니다.
    const fetchMessages = async () => {
      // 임시 데이터
      const dummyMessages = [
        {
          id: 1,
          content: '메리 크리스마스! 모두에게 축복이 가득하길 바랍니다.',
          name: '김성실',
        },
        {
          id: 2,
          content: '예수님의 사랑이 우리 모두에게 함께하기를.',
          name: '이축복',
        },
        {
          id: 3,
          content: '올해도 감사한 마음으로 크리스마스를 맞이합니다.',
          name: '박감사',
        },
        {
          id: 4,
          content: '우리 교회 모든 분들께 평화와 기쁨이 가득하시길!',
          name: '정평화',
        },
        {
          id: 5,
          content: '크리스마스의 진정한 의미를 되새기는 시간 되세요.',
          name: '최은혜',
        },
      ];
      setMessages(dummyMessages);
      setLoading(false);
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
                  <p className='text-sm text-indigo-600 flex items-center'>
                    <User className='mr-1' size={16} /> {message.name}
                  </p>
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
