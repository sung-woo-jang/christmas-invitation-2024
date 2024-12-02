import Link from 'next/link';
import { Star } from 'lucide-react';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center'>
      <h1 className='text-5xl font-bold text-indigo-600 mb-6'>
        예수님의 생일에 초대합니다
      </h1>
      <p className='text-xl text-gray-700 mb-8'>
        함께 축하해요, 우리의 구주 예수님의 탄생을
      </p>
      <div className='bg-white p-8 rounded-lg shadow-lg mb-8 w-full max-w-md'>
        <div className='flex items-center justify-center mb-4'>
          <Star className='text-yellow-400 w-8 h-8 mr-2' />
          <h2 className='text-2xl font-semibold text-indigo-600'>행사 정보</h2>
          <Star className='text-yellow-400 w-8 h-8 ml-2' />
        </div>
        <p className='text-gray-700 mb-2'>
          <span className='font-semibold'>일시:</span> 2024년 12월 25일
        </p>
        <p className='text-gray-700'>
          <span className='font-semibold'>장소:</span> 계산 교회
        </p>
      </div>
      <div className='mb-8'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='200'
          height='200'
          viewBox='0 0 200 200'
        >
          <rect width='200' height='200' fill='#f3f4f6' rx='10' />
          <path d='M100 30 L130 90 L70 90 Z' fill='#4f46e5' />
          <rect x='85' y='90' width='30' height='60' fill='#4f46e5' />
          <circle cx='100' cy='20' r='10' fill='#fbbf24' />
        </svg>
      </div>
      <div className='bg-indigo-100 p-6 rounded-lg mb-8 w-full max-w-2xl'>
        <p className='text-lg italic text-indigo-800'>
          "천사가 이르되 무서워하지 말라 보라 내가 온 백성에게 미칠 큰 기쁨의
          좋은 소식을 너희에게 전하노라 오늘 다윗의 동네에 너희를 위하여 구주가
          나셨으니 곧 그리스도 주시니라"
        </p>
        <p className='text-right mt-2 text-indigo-600 font-semibold'>
          - 누가복음 2:10-11
        </p>
      </div>
      <Link
        href='/photozone'
        className='bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md'
      >
        포토존 보러가기 →
      </Link>
    </div>
  );
}
