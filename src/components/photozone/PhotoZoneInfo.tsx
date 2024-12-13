import { Fragment } from 'react';
import { Camera } from 'lucide-react';

export default function PhotoZoneInfo() {
  return (
    <Fragment>
      <h2 className='text-2xl font-semibold text-indigo-600 mb-4 flex items-center'>
        <Camera className='mr-2' /> 예수님 탄생의 밤
      </h2>
      <p className='text-gray-700 mb-4'>
        아름다운 구유와 천사 장식으로 꾸며진 포토존에서 특별한 추억을
        만들어보세요.
      </p>
    </Fragment>
  );
}
