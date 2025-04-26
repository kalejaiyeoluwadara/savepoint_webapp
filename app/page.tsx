// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-4xl font-bold mb-6">SavePoint</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Save your links and text snippets. Access them anywhere, anytime.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/dashboard" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Get Started
        </Link>
        <Link 
          href="/auth/login" 
          className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded"
        >
          Login
        </Link>
      </div>
    </div>
  );
}