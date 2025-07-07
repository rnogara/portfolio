"use client"

import { useRouter } from 'next/navigation';
import { usePortfolio } from './context/PortfolioContext';

export default function NotFound() {
  const router = useRouter();
  const { content } = usePortfolio();

  return (
    <div className="relative overflow-hidden w-full h-screen bg-gray-900">
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold mb-6 text-white font-[Orbitron] text-shadow-md">
          {content?.error404[0]}
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          {content?.error404[1]}
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        > 
          {content?.error404[2]}
        </button>
      </div>
    </div>
  );
}