'use client';

import { useEffect } from 'react';
import { Camera, MapPin, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import crypto from 'crypto';
import axios from 'axios';
export default function PhotoZone() {
  const photoZones = [
    {
      id: 1,
      name: 'https://kr.object.ncloudstorage.com/kcc-invite/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%2020241203%20%EC%98%A4%ED%9B%84%208.06.02.png',
      location: '교회 3층',
    },
  ];

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');

        // AWS Signature V4 parameters
        const accessKey = 'ncp_iam_BPAMKR3V7PDLzwbyQHQo';
        const secretKey = 'ncp_iam_BPKMKRLgjIRSPKDkytSgsV68238Iu54hn2';
        const region = 'kr-standard';
        const service = 's3';

        // Create canonical request
        const method = 'GET';
        const canonicalUri = '/kcc-invite';
        const canonicalQueryString = '';
        const payloadHash =
          'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'; // Empty payload hash

        const canonicalHeaders =
          [
            `host:kr.object.ncloudstorage.com`,
            `x-amz-content-sha256:${payloadHash}`,
            `x-amz-date:${timestamp}`,
          ].join('\n') + '\n';

        const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';

        const canonicalRequest = [
          method,
          canonicalUri,
          canonicalQueryString,
          canonicalHeaders,
          signedHeaders,
          payloadHash,
        ].join('\n');

        // Create string to sign
        const algorithm = 'AWS4-HMAC-SHA256';
        const scope = `${date}/${region}/${service}/aws4_request`;
        const stringToSign = [
          algorithm,
          timestamp,
          scope,
          crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
        ].join('\n');

        // Calculate signature
        const getSignatureKey = (
          key: any,
          dateStamp: any,
          regionName: any,
          serviceName: any,
        ) => {
          const kDate = crypto
            .createHmac('sha256', 'AWS4' + key)
            .update(dateStamp)
            .digest();
          const kRegion = crypto
            .createHmac('sha256', kDate)
            .update(regionName)
            .digest();
          const kService = crypto
            .createHmac('sha256', kRegion)
            .update(serviceName)
            .digest();
          const kSigning = crypto
            .createHmac('sha256', kService)
            .update('aws4_request')
            .digest();
          return kSigning;
        };

        const signature = crypto
          .createHmac(
            'sha256',
            getSignatureKey(secretKey, date, region, service),
          )
          .update(stringToSign)
          .digest('hex');

        // Create authorization header
        const authorizationHeader = [
          `${algorithm} Credential=${accessKey}/${scope}`,
          `SignedHeaders=${signedHeaders}`,
          `Signature=${signature}`,
        ].join(', ');

        const response = await axios.get(
          'https://kr.object.ncloudstorage.com/kcc-invite',
          {
            headers: {
              Authorization: authorizationHeader,
              'x-amz-content-sha256': payloadHash,
              'x-amz-date': timestamp,
            },
          },
        );

        // Process the response data as needed
        console.log('Response:', response.data);
        // Update state with the fetched data if needed
        // setPhotoZones(processedData);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);
  return (
    <div className='max-w-3xl mx-auto px-4'>
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
      <div className='mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl shadow-lg'>
        <h3 className='text-2xl font-bold text-indigo-700 mb-6'>
          포토존 미리보기
        </h3>

        <div className='grid gap-6'>
          {photoZones.map((zone) => (
            <div key={zone.id} className='bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold text-indigo-600 mb-2 flex items-center'>
                <Camera className='mr-2' /> {zone.name}
              </h2>
              <p className='text-gray-700 mb-4 flex items-center'>
                <MapPin className='mr-2 text-indigo-600' /> 위치:{' '}
                {zone.location}
              </p>
              <div className='aspect-video relative mb-4'>
                <Image
                  src={zone.name}
                  alt={zone.name}
                  width={500}
                  height={500}
                  // layout='fill'
                  // objectFit='cover'
                  className='rounded-lg'
                />
              </div>
            </div>
          ))}
        </div>
        <div className='mt-8 flex justify-center'>
          <Button asChild className='w-full sm:w-auto'>
            <Link
              href='/photozone/list'
              className='flex items-center justify-center'
            >
              <span>모든 포토존 보기</span>
              <ChevronRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
