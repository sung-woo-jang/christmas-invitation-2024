'use client';

import { useState } from 'react';
import { Send, User, List } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: number;
  content: string;
  name: string;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
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
    }
  };

  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='text-4xl font-bold text-center text-indigo-600 mb-8'>
        축복 메시지
      </h1>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-lg mb-8'
      >
        <div className='mb-4'>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            메시지
          </label>
          <textarea
            id='message'
            rows={3}
            className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            이름 (선택사항)
          </label>
          <input
            type='text'
            id='name'
            className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center'
        >
          <Send className='mr-2' /> 메시지 남기기
        </button>
      </form>
      <div className='mt-4 text-center'>
        <Link
          href='/messages/list'
          className='inline-flex items-center text-indigo-600 hover:text-indigo-800'
        >
          <List className='mr-2' /> 모든 메시지 보기
        </Link>
      </div>
      <div className='space-y-4'>
        {messages.map((message) => (
          <div key={message.id} className='bg-white p-6 rounded-lg shadow-md'>
            <p className='text-gray-800 mb-2'>{message.content}</p>
            <p className='text-sm text-indigo-600 flex items-center'>
              <User className='mr-1' size={16} /> {message.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
