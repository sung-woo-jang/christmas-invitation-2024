import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';
import UploadForm from '@/app/photozone/UploadForm';
import { revalidatePath } from 'next/cache';

export default async function Page() {
  async function revalidatePhotos() {
    'use server';
    revalidatePath('/photozone/list');
    revalidatePath('/photozone');
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4 space-y-8'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-xl font-bold text-center text-green-700'>
            1️⃣ 오너먼트 달기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center mb-4'>
            예배실 문 앞 트리에 자신이 준비한
            <br />
            오너먼트를 달아주세요!
            <br />
            다*소, 직접 만든 수제 오너먼트 다 환영🤗
          </p>
          <div className='relative w-full h-64'>
            <Image
              src='/1.jpeg'
              alt='오너먼트 달기'
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
            />
          </div>
        </CardContent>
      </Card>

      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-xl font-bold text-center text-green-700'>
            2️⃣ 감사기도 적기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center mb-4'>
            게시판에 있는 트리에 감사기도를 적어주세요!
            <br />
            여러분의 감사가 많이 적혀질 수록
            <br />
            트리가 풍성해져요🎄
          </p>
          <div className='relative w-full h-64'>
            <Image
              src='/2.jpeg'
              alt='감사기도 적기'
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
            />
          </div>
        </CardContent>
      </Card>

      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-xl font-bold text-center text-green-700'>
            3️⃣ 가정별 사진 찍기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center mb-4'>
            가정별로 사진을 찍어주세요.
            <br />
            이혜주 팀장에게 보내면 끗!
            <br />
            사진은 1:1 정방향으로 찍기!
          </p>
          <div className='relative w-full h-64'>
            <Image
              src='/3.jpeg'
              alt='가정별 사진'
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
            />
          </div>
        </CardContent>
      </Card>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-xl font-bold text-center text-green-700'>
            🎄 내 트리 꾸미기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center mb-4'>
            그럼 여러분! 지금 당장! 망설이지 말고!
            <br />내 트리를 꾸며줘~~🎄
          </p>
          <p className='text-center mb-4 font-bold'>
            👇🏻여기서도 내가 찍은 사진을
            <br />
            자랑할 수 있어요👇🏻
          </p>
          <div className='flex justify-center'>
            <div className='mb-8'>
              <Suspense fallback={<div>업로드 폼 로딩중...</div>}>
                <UploadForm onUploadCompleteAction={revalidatePhotos} />
              </Suspense>
            </div>
          </div>
        </CardContent>
      </Card>

      {/*
(사진업로드 버튼)
(사진 게시판 갤러리로 쭉 보여주기)
      */}
    </div>
  );
}
