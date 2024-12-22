'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Bilgi Yönetim Sistemi</h1>
      <p className="text-lg text-gray-600 mb-4">Lütfen giriş yaparak devam edin.</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition-all duration-200"
        onClick={() => router.push('/login')}
      >
        Giriş Yap
      </button>
    </div>
  );
}