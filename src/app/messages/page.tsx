'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from 'lucide-react';
import { saveMessage, Message, getMessages } from '@/utils/firebasedb';
import { hashPassword } from '@/utils/crypto';
import { validateMessage } from '@/utils/validation';

export default function Messages() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    content: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const result = await saveMessage({
        content: formData.content.trim(),
        name: formData.name.trim() || '익명',
        password: formData.password,
      });

      if (result.success) {
        // 메시지 저장 성공 시 폼 초기화
        setFormData({
          name: '',
          content: '',
          password: '',
        });

        // 새로운 메시지를 포함하여 최근 메시지 목록 업데이트
        const updatedMessages = await getMessages();
        setMessages(updatedMessages.slice(0, 3));
      } else {
        alert('메시지 저장에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            name='name'
            className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500'
            value={formData.name}
            onChange={handleChange}
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
            name='password'
            className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='content'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            메시지
          </label>
          <textarea
            id='content'
            name='content'
            className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500'
            value={formData.content}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
        >
          {loading ? '저장 중...' : '등록'}
        </button>
      </form>
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>최근 메시지</h2>
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
                    {message.createdAt && (
                      <p className='text-sm text-gray-500'>
                        {new Date(message.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
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
