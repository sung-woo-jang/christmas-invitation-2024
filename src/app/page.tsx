import Link from 'next/link';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center'>
      <h1 className='text-5xl font-bold text-indigo-600 mb-6'>
        예수님의 생일에
        <br />
        초대합니다
      </h1>
      <div className='mb-8'>
        <Image
          src={'/my-tree.jpg'}
          alt={'my-tree.jpg'}
          width={430}
          height={932}
          objectFit={'cover'}
        />
      </div>
      {/* 기울임꼴 */}
      <div className='bg-indigo-100 p-6 rounded-lg mb-8 w-full max-w-2xl'>
        <p className='text-lg italic text-indigo-800'>
          "오늘 다윗의 동네에 너희를 위하여 구주가 나셨으니 곧 그리스도
          주시니라."
        </p>
        <p className='text-right mt-2 text-indigo-600 font-semibold'>
          - 누가복음 2장 11절
        </p>
      </div>

      {/* 전체적으로 조화롭게 */}
      <div className='bg-white p-8 rounded-lg shadow-lg mb-8 w-full max-w-md'>
        <div className='flex items-center justify-center mb-4'>
          <h2 className='text-lg font-semibold text-indigo-600'>
            🚨하늘제자 여러분의 도움이 필요합니다🚨
          </h2>
        </div>
        <p className='text-gray-700 mb-2'>
          <span className='font-semibold'>
            여러분이 직접 트리를 꾸며서 <br />
            성탄절을 함께 준비해 주세요!
            <br /> 내 트리를 꾸며줘~~~🎄
          </span>
        </p>
        <p className='text-gray-700'>
          꾸미는 방법이 궁금하다고요? 지금 바로 알려드릴게요👇🏻
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
