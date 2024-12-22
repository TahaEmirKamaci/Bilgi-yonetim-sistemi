
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xl font-bold">Öğrenci Bilgi Sistemi</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-indigo-200">Hoşgeldin, {user.name}</span>
                <button onClick={handleLogout} className="btn btn-primary bg-white text-indigo-600 hover:bg-indigo-50">
                  Çıkış Yap
                </button>
              </>
            ) : (
              <Link href="/login" className="btn btn-primary bg-white text-indigo-600 hover:bg-indigo-50">
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}