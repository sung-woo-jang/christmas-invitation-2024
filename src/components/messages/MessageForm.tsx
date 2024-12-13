import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { saveMessage } from '@/utils/firebasedb';
import { hashPassword } from '@/utils/crypto';
import { useState } from 'react';

const messageSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .max(20, '이름은 20자를 초과할 수 없습니다.')
    .transform((val) => val.trim()),
  content: z
    .string()
    .min(1, '메시지를 입력해주세요.')
    .max(500, '메시지는 500자를 초과할 수 없습니다.')
    .transform((val) => val.trim()),
  password: z
    .string()
    .min(4, '비밀번호는 최소 4자 이상이어야 합니다.')
    .max(20, '비밀번호는 20자를 초과할 수 없습니다.'),
});

type MessageFormData = z.infer<typeof messageSchema>;

interface MessageFormProps {
  onMessageSubmit: (success: boolean) => void;
}

export default function MessageForm({ onMessageSubmit }: MessageFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: '',
      content: '',
      password: '',
    },
  });

  const onSubmit = async (data: MessageFormData) => {
    setLoading(true);
    try {
      const hashedPassword = await hashPassword(data.password);

      const result = await saveMessage({
        content: data.content,
        name: data.name || '익명',
        password: hashedPassword,
      });

      if (result.success) {
        reset();
        // 새 메시지 저장 후 최근 메시지 다시 가져오기
        onMessageSubmit(true); // 성공 플래그만 전달
      } else {
        alert('메시지 저장에 실패했습니다. 다시 시도해주세요.');
        onMessageSubmit(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 ${
            errors.name ? 'border-red-500' : ''
          }`}
          {...register('name')}
        />
        {errors.name && (
          <p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>
        )}
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
          className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 ${
            errors.password ? 'border-red-500' : ''
          }`}
          {...register('password')}
        />
        {errors.password && (
          <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>
        )}
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
          className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 ${
            errors.content ? 'border-red-500' : ''
          }`}
          rows={4}
          {...register('content')}
        />
        {errors.content && (
          <p className='mt-1 text-sm text-red-500'>{errors.content.message}</p>
        )}
      </div>
      <button
        type='submit'
        disabled={loading}
        className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
      >
        {loading ? '저장 중...' : '등록'}
      </button>
    </form>
  );
}
