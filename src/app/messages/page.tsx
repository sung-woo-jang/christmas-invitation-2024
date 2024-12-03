'use client';

import { useState } from 'react';

interface Message {
  id: number;
  content: string;
  name: string;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
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
      <ul>
        {messages.map((message) => (
          <li key={message.id} className='mb-2'>
            <span className='font-bold'>{message.name}: </span>
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
