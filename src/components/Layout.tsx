import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`min-h-screen bg-gray-50 text-gray-900 ${montserrat.className}`}
    >
      <nav className='bg-white shadow-md'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex items-center'>
              <Link href='/' className='text-2xl font-bold text-red-600'>
                내 트리를 꾸며줘🎄
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {children}
      </main>
    </div>
  );
}
