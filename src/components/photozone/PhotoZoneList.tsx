import Image from 'next/image';
import { Photo } from '@/utils/object-storage';

interface PhotoZonePreviewProps {
  photos: Photo[];
  limit?: number;
}

export default function PhotoZoneList({
  photos,
  limit,
}: PhotoZonePreviewProps) {
  return (
    <div className='grid gap-4 sm:gap-6'>
      {photos?.slice(0, limit).map((photo) => (
        <div
          key={photo.id}
          className='bg-white p-2 sm:p-4 rounded-lg shadow-lg'
        >
          <div className='aspect-[3/4] relative'>
            <Image
              src={photo?.base64Url ? photo?.base64Url : '/Christmas.webp'}
              alt={`포토존 ${photo.id}`}
              fill
              className='rounded-lg object-cover'
              sizes='(max-width: 430px) 90vw, (max-width: 768px) 45vw, 30vw'
            />
          </div>
        </div>
      ))}
    </div>
  );
}
