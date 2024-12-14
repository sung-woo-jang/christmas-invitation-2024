import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center'>
      <Image
        src={'/my-tree.jpg'}
        alt={'my-tree.jpg'}
        width={430}
        height={932}
        objectFit={'cover'}
        className={'mb-8'}
      />
      <Button asChild variant='outline' size='lg' className='gap-2'>
        <Link href='/introduce'>
          자세히 보기 <ChevronRight className='h-4 w-4' />
        </Link>
      </Button>
      {/*  자세히 보기 버튼 -> */}
    </div>
  );
}
