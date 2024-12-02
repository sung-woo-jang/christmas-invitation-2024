import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/Layout';
import Image from 'next/image';

export const metadata: Metadata = {
  title: ' 크리스마스 초대장',
  description: '예수님의 생일파티에 초대합니다.',
  openGraph: {
    title: '크리스마스 초대장',
    description:
      '예수님의 탄생을 축하하는 특별한 크리스마스 행사에 여러분을 초대합니다.',
    images: [
      {
        url: '/Christmas.webp',
        width: 1200,
        height: 630,
        alt: '크리스마스 초대장 미리보기',
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
      </body>
    </html>
  );
}
