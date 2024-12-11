// app/photozone/list/upload.tsx (클라이언트 컴포넌트)
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function UploadForm({
  onUploadComplete,
}: {
  onUploadComplete: () => void;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    if (!file) return;

    try {
      setIsUploading(true);
      const response = await fetch('/api/photos', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      onUploadComplete();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='flex flex-col space-y-2'>
        <label htmlFor='file' className='text-sm font-medium text-gray-700'>
          사진 선택
        </label>
        <input
          required
          type='file'
          name='file'
          id='file'
          accept='image/*'
          className='px-4 py-2 border rounded-md'
        />
      </div>
      <Button type='submit' disabled={isUploading}>
        {isUploading ? '업로드 중...' : '업로드'}
      </Button>
    </form>
  );
}
