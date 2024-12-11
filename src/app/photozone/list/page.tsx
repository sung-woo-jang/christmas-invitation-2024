import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Photo {
  id: number;
  name: string;
  lastModified: string;
  size: number;
}

interface PhotoResponse {
  photos: Photo[];
}

async function getPhotos(): Promise<Photo[]> {
  const res = await fetch('http://localhost:3000/api/photos');
  const data: PhotoResponse = await res.json();
  return data.photos;
}

export default async function PhotoZoneList() {
  const photos = await getPhotos();

  return (
    <div className='mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl shadow-lg'>
      <h1 className='text-3xl font-bold text-center text-indigo-600 my-8'>
        포토존 리스트
      </h1>
      <div className='grid gap-6'>
        {photos.map((photo) => (
          <div key={photo.id} className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='aspect-video relative mb-4'>
              <Image
                src={photo.name}
                alt={`포토존 ${photo.id}`}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='rounded-lg object-cover'
              />
              <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2'>
                <p>크기: {Math.round(photo.size / 1024)} KB</p>
                <p>
                  수정일: {new Date(photo.lastModified).toLocaleDateString()}
                </p>
              </div>
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
