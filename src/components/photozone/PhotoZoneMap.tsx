export default function PhotoZoneMap() {
  return (
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
  );
}
