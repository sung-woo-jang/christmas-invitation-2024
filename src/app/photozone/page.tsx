import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getPhotosWithBase64 } from '@/utils/object-storage';
import PhotoZoneList from '@/components/photozone/PhotoZoneList';

export default async function Page() {
  const photos = await getPhotosWithBase64();

  return (
    <div className='mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl shadow-lg'>
      <PhotoZoneList photos={photos} />

      <div className='flex justify-center mt-8'>
        <Button asChild>
          <Link href='/photozone'>포토존 메인으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
