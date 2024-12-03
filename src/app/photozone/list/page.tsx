import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Camera, MapPin } from 'lucide-react';

export default function PhotoZoneList() {
  const photoZones = [
    { id: 1, name: 'photo_zone_1.webp', location: '교회 3층' },
    { id: 2, name: 'photo_zone_2.webp', location: '교회 2층 로비' },
    { id: 3, name: 'photo_zone_3.webp', location: '교회 1층 입구' },
  ];

  return (
    <div className='mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl shadow-lg'>
      <h1 className='text-3xl font-bold text-center text-indigo-600 my-8'>
        포토존 리스트
      </h1>
      <div className='grid gap-6'>
        {photoZones.map((zone) => (
          <div key={zone.id} className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-xl font-semibold text-indigo-600 mb-2 flex items-center'>
              <Camera className='mr-2' /> {zone.name}
            </h2>
            <p className='text-gray-700 mb-4 flex items-center'>
              <MapPin className='mr-2 text-indigo-600' /> 위치: {zone.location}
            </p>
            <div className='aspect-video relative mb-4'>
              <Image
                src={`/${zone.name}`}
                alt={zone.name}
                layout='fill'
                objectFit='cover'
                className='rounded-lg'
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
