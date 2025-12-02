"use client"
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';
// import About from '@/components/About';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      router.push(`/builder?prompt=${encodeURIComponent(prompt)}`);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-black to-neutral-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-neutral-100 tracking-tight mb-3">
            Make.it — Website Builder AI
          </h1>
          <p className="text-base text-neutral-400">
            Describe your ideal website and get a guided build plan instantly
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-neutral-950/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-neutral-800">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the website you want to build..."
              className="w-full h-32 p-4 bg-black text-neutral-200 rounded-lg border border-neutral-800 focus:ring-2 focus:ring-neutral-600 focus:border-transparent resize-none placeholder-neutral-500"
            />

            <button
              type="submit"
              className="w-full mt-5 bg-neutral-800 text-neutral-100 py-3 px-6 rounded-lg font-medium hover:bg-neutral-700 active:scale-[0.98] transition"
            >
              Generate Website Plan
            </button>
          </div>
        </form>
      </div>
    </div>

    {/* <About/> */}
    </>


  );
}