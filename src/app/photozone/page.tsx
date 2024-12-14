import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getPhotosWithBase64 } from '@/utils/object-storage';
import PhotoZoneList from '@/components/photozone/PhotoZoneList';
import { Card, CardContent } from '@/components/ui/card';

export default async function Page() {
  const photos = await getPhotosWithBase64();

  return (
    <div className='mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl shadow-lg'>
      <Card>
        <CardContent className='pt-6'>
          <PhotoZoneList photos={photos} />
        </CardContent>
      </Card>

      <div className='flex justify-center mt-8'>
        <Button asChild>
          <Link href='/introduce'>메인으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
