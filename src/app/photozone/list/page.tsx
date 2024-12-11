import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import UploadForm from '@/app/photozone/list/upload';
import { revalidatePath } from 'next/cache';
import { getPhotosWithBase64 } from '@/app/api/photos/route';

interface Photo {
  id: number;
  name: string;
  lastModified: string;
  size: number;
  base64Url: string;
}

interface PhotoResponse {
  photos: Photo[];
}

export default async function PhotoZoneList() {
  const photos = await getPhotosWithBase64();

  async function revalidatePhotos() {
    'use server';
    revalidatePath('/photozone/list');
  }

  return (
    <div className='mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl shadow-lg'>
      <h1 className='text-3xl font-bold text-center text-indigo-600 my-8'>
        포토존 리스트
      </h1>

      <div className='mb-8'>
        <Suspense fallback={<div>업로드 폼 로딩중...</div>}>
          <UploadForm onUploadCompleteAction={revalidatePhotos} />
        </Suspense>
      </div>

      <div className='grid gap-6'>
        {photos?.map((photo) => (
          <div key={photo.id} className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='aspect-video relative mb-4'>
              <Image
                src={photo?.base64Url ? photo?.base64Url : '/Christmas.webp'}
                alt={`포토존 ${photo.id}`}
                fill
                className='rounded-lg object-cover'
              />
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-8'>
        <Button asChild>
          <Link href='/photozone'>포토존 메인으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
