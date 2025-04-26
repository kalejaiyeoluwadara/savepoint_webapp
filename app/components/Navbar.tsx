// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              SavePoint
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/dashboard' ? 'text-blue-600' : ''}`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 rounded bg-red-100 hover:bg-red-200 text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className={`px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/auth/login' ? 'text-blue-600' : ''}`}
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register" 
                  className={`px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/auth/register' ? 'text-blue-600' : ''}`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}