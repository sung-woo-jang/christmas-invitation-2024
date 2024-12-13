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
    <div className='grid gap-6'>
      {photos?.slice(0, limit).map((photo) => (
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
  );
}
