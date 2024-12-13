import { getPhotosWithBase64 } from '@/utils/object-storage';
import PhotoZoneMap from '@/components/photozone/PhotoZoneMap';
import PhotoZoneIntroduction from '@/components/photozone/PhotoZoneIntroduction';
import PhotoZoneLocation from '@/components/photozone/PhotoZoneLocation';
import PhotoZoneInfo from '@/components/photozone/PhotoZoneInfo';
import PhotoZoneList from '@/components/photozone/PhotoZoneList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default async function PhotoZone() {
  const photos = await getPhotosWithBase64();

  return (
    <div className='max-w-3xl mx-auto px-4'>
      <h1 className='text-4xl font-bold text-center text-indigo-600 mb-8'>
        포토존
      </h1>
      <div className='bg-white p-8 rounded-lg shadow-lg mb-8'>
        <PhotoZoneInfo />
        <PhotoZoneLocation />
      </div>
      <PhotoZoneMap />
      <PhotoZoneIntroduction />
      <div className='mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl shadow-lg'>
        <h3 className='text-2xl font-bold text-indigo-700 mb-6'>
          포토존 미리보기
        </h3>
        <PhotoZoneList photos={photos} limit={3} />
        <div className='mt-8 flex justify-center'>
          <Button asChild className='w-full sm:w-auto'>
            <Link
              href='/photozone/list'
              className='flex items-center justify-center'
            >
              <span>모든 포토존 보기</span>
              <ChevronRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
