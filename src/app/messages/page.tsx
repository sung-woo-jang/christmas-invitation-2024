'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  name: string;
  password: string;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: '축하드립니다! 행복한 날 되세요.',
      name: '김철수',
      password: 'qwe',
    },
    {
      id: 2,
      content: '새로운 출발을 응원합니다!',
      name: '이영희',
      password: 'qwe',
    },
    {
      id: 3,
      content: '축하합니다. 좋은 날 되세요~',
      name: '박지성',
      password: 'qwe',
    },
    {
      id: 4,
      content: '늘 행복하세요~~~~~~~~~~!',
      name: '최유리',
      password: 'qwe',
    },
    {
      id: 5,
      content: '축하드려요! 멋진 날 되세요.',
      name: '정민수',
      password: 'qwe',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && password === '1234') {
      // 임시 비밀번호 '1234' 설정
      setMessages([
        {
          id: Date.now(),
          content: newMessage.trim(),
          name: name.trim() || '익명',
          password: password.trim() || '1234',
        },
        ...messages,
      ]);
      setNewMessage('');
      setName('');
      setPassword('');
    } else if (password !== '1234') {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>메시지 게시판</h1>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-4 sm:p-8 rounded-lg shadow-lg mb-8'
      >
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            이름
          </label>
          <input
            type='text'
            id='name'
            className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            비밀번호
          </label>
          <input
            type='password'
            id='password'
            className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            메시지
          </label>
          <textarea
            id='message'
            className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          등록
        </button>
      </form>
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>최근 메시지</h2>
        <div className='space-y-4'>
          {messages.slice(0, 3).map((message) => (
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
