'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function UploadForm({
  onUploadCompleteAction,
}: {
  onUploadCompleteAction: () => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    if (!file) {
      setError('파일을 선택해주세요.');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      const response = await fetch('/api/photos', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      await response.json();
      onUploadCompleteAction();
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error:', error);
      setError('업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-center text-indigo-600'>
          사진 업로드
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='file' className='text-sm font-medium text-gray-700'>
              사진 선택
            </Label>
            <Input
              required
              type='file'
              name='file'
              id='file'
              accept='image/*'
              onChange={handleFileChange}
              ref={fileInputRef}
              className='cursor-pointer'
            />
          </div>
          {previewUrl && (
            <div className='mt-4'>
              <img
                src={previewUrl}
                alt='Preview'
                className='max-w-full h-auto rounded-lg shadow-md'
              />
            </div>
          )}
          {error && (
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <CardFooter className='px-0'>
            <Button type='submit' disabled={isUploading} className='w-full'>
              {isUploading ? (
                <>
                  <Upload className='mr-2 h-4 w-4 animate-spin' />
                  업로드 중...
                </>
              ) : (
                <>
                  <Upload className='mr-2 h-4 w-4' />
                  업로드
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
