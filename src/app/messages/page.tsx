'use client';

import { useState } from 'react';
import Link from 'next/link';
import MessageList from '@/components/messages/MessageList';
import MessageForm from '@/components/messages/MessageForm';

export default function Page() {
  const [key, setKey] = useState<number>(0); // MessageList를 리렌더링하기 위한 키

  const handleMessageSubmit = (success: boolean) => {
    if (success) {
      // MessageList 컴포넌트를 강제로 리렌더링
      setKey((prev) => prev + 1);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>메시지 게시판</h1>
      <MessageForm onMessageSubmit={handleMessageSubmit} />

      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>최근 메시지</h2>
        <MessageList key={key} reRenderKey={key} limit={3} />
      </div>

      <div className='mt-4 text-center'>
        <Link
          href='/messages/list'
          className='text-indigo-600 hover:text-indigo-800'
        >
          모든 메시지 보기
        </Link>
      </div>
    </div>
  );
}
