'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import { Menu, X } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`min-h-screen bg-gray-50 text-gray-900 ${montserrat.className}`}
    >
      <nav className='bg-white shadow-md'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex items-center'>
              <Link href='/' className='text-2xl font-bold text-indigo-600'>
                크리스마스 초대장
              </Link>
            </div>
            <div className='hidden md:flex items-center space-x-4'>
              <Link
                href='/'
                className='text-gray-700 hover:text-indigo-600 transition duration-300'
              >
                홈
              </Link>
              <Link
                href='/photozone'
                className='text-gray-700 hover:text-indigo-600 transition duration-300'
              >
                포토존
              </Link>
              <Link
                href='/messages'
                className='text-gray-700 hover:text-indigo-600 transition duration-300'
              >
                메시지 작성
              </Link>
              <Link
                href='/messages/list'
                className='text-gray-700 hover:text-indigo-600 transition duration-300'
              >
                메시지 목록
              </Link>
            </div>
            <div className='md:hidden flex items-center'>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600'
              >
                {isMenuOpen ? (
                  <X className='h-6 w-6' />
                ) : (
                  <Menu className='h-6 w-6' />
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className='md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50'>
            <div className='px-4 py-2 space-y-2'>
              <Link
                href='/'
                className='block text-gray-700 hover:text-indigo-600 transition duration-300 bg-gray-100 rounded-lg px-4 py-2 hover:bg-indigo-50'
              >
                홈
              </Link>
              <Link
                href='/photozone'
                className='block text-gray-700 hover:text-indigo-600 transition duration-300 bg-gray-100 rounded-lg px-4 py-2 hover:bg-indigo-50'
              >
                포토존
              </Link>
              <Link
                href='/messages'
                className='block text-gray-700 hover:text-indigo-600 transition duration-300 bg-gray-100 rounded-lg px-4 py-2 hover:bg-indigo-50'
              >
                메시지 작성
              </Link>
              <Link
                href='/messages/list'
                className='block text-gray-700 hover:text-indigo-600 transition duration-300 bg-gray-100 rounded-lg px-4 py-2 hover:bg-indigo-50'
              >
                메시지 목록
              </Link>
            </div>
          </div>
        )}
      </nav>
      <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {children}
      </main>
    </div>
  );
}
