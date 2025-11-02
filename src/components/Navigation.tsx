'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">Voucher Seat Assignment</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-blue-500'
                }`}
              >
                Home
              </Link>
              <Link
                href="/aircraft"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/aircraft')
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-blue-500'
                }`}
              >
                Aircrafts
              </Link>
              <Link
                href="/vouchers"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/vouchers')
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-blue-500'
                }`}
              >
                Vouchers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              isActive('/')
                ? 'bg-blue-50 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500'
            }`}
          >
            Home
          </Link>
          <Link
            href="/aircraft"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              isActive('/aircraft')
                ? 'bg-blue-50 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500'
            }`}
          >
            Aircraft
          </Link>
          <Link
            href="/flights"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              isActive('/flights')
                ? 'bg-blue-50 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500'
            }`}
          >
            Flights
          </Link>
          <Link
            href="/vouchers"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              isActive('/vouchers')
                ? 'bg-blue-50 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500'
            }`}
          >
            Vouchers
          </Link>
        </div>
      </div>
    </nav>
  );
}