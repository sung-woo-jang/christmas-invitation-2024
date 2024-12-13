import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import UploadForm from '@/app/photozone/list/UploadForm';
import { revalidatePath } from 'next/cache';
import { getPhotosWithBase64 } from '@/utils/object-storage';
import PhotoZoneList from '@/components/photozone/PhotoZoneList';

export default async function Page() {
  const photos = await getPhotosWithBase64();

  async function revalidatePhotos() {
    'use server';
    revalidatePath('/photozone/list');
    revalidatePath('/photozone');
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

      <PhotoZoneList photos={photos} />

      <div className='flex justify-center mt-8'>
        <Button asChild>
          <Link href='/photozone'>포토존 메인으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
