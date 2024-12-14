import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/Layout';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: '내 트리를 꾸며줘🎄',
  description: '예수님의 생일파티에 초대합니다.',
  metadataBase: new URL('https://christmas-invitations.vercel.app/'), // 실제 도메인으로 변경
  openGraph: {
    title: '내 트리를 꾸며줘🎄',
    description:
      '예수님의 탄생을 축하하는 특별한 크리스마스 행사에 여러분을 초대합니다.',
    type: 'website',
    locale: 'ko_KR',
    url: '/', // 또는 실제 페이지 경로
    siteName: '내 트리를 꾸며줘🎄',
    images: [
      {
        url: '/123.jpeg',
        width: 3024,
        height: 4032,
        alt: '내 트리를 꾸며줘🎄 미리보기',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko-kr'>
      <body suppressHydrationWarning>
        <Layout>{children}</Layout>
        <Toaster />
      </body>
    </html>
  );
}
