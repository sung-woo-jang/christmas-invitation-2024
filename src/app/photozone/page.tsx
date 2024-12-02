import { Camera, MapPin } from 'lucide-react';

export default function PhotoZone() {
  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='text-4xl font-bold text-center text-indigo-600 mb-8'>
        포토존
      </h1>
      <div className='bg-white p-8 rounded-lg shadow-lg mb-8'>
        <h2 className='text-2xl font-semibold text-indigo-600 mb-4 flex items-center'>
          <Camera className='mr-2' /> 예수님 탄생의 밤
        </h2>
        <p className='text-gray-700 mb-4'>
          아름다운 구유와 천사 장식으로 꾸며진 포토존에서 특별한 추억을
          만들어보세요.
        </p>
        <p className='text-gray-700 mb-4 flex items-center'>
          <MapPin className='mr-2 text-indigo-600' /> 위치: 교회 3층
        </p>
      </div>
      <div className='bg-indigo-100 p-8 rounded-lg shadow-lg mb-8'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 300 200'
          className='w-full h-auto'
        >
          <rect width='300' height='200' fill='#e0e7ff' rx='10' />
          <rect
            x='50'
            y='30'
            width='200'
            height='140'
            rx='10'
            fill='#ffffff'
            stroke='#4f46e5'
            strokeWidth='4'
          />
          <text
            x='150'
            y='100'
            textAnchor='middle'
            fontSize='16'
            fill='#4f46e5'
            fontFamily='Arial'
          >
            여기서 사진을 찍어보세요!
          </text>
          <circle cx='60' cy='170' r='20' fill='#fbbf24' />
          <path d='M55 170 L65 170 L60 155 Z' fill='#fbbf24' />
        </svg>
      </div>
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <h3 className='text-xl font-semibold text-indigo-600 mb-4'>
          포토존 소개
        </h3>
        <p className='text-gray-700 mb-4'>
          우리 교회의 특별한 크리스마스 포토존에 오신 것을 환영합니다. 이 공간은
          예수님의 탄생을 기념하고 여러분의 소중한 순간을 담기 위해
          준비되었습니다.
        </p>
        <p className='text-gray-700'>
          아름다운 장식과 따뜻한 조명 속에서 가족, 친구들과 함께 특별한 추억을
          만들어보세요. 이 곳에서 찍은 사진은 올해의 크리스마스를 더욱 특별하게
          기억하는 데 도움이 될 것입니다.
        </p>
      </div>
    </div>
  );
}
