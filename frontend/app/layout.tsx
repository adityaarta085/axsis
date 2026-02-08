import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Axis Portal - Internet Cepat & Hemat',
  description: 'Beli paket internet Axis terbaik untuk kebutuhan Anda.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased`}>
        <nav className="sticky top-0 z-50 border-b border-axis-gray-100 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
            <div className="text-2xl font-black text-axis-purple italic">AXIS</div>
            <div className="hidden space-x-8 md:flex">
              <a href="/" className="text-sm font-medium hover:text-axis-purple">Home</a>
              <a href="/packages" className="text-sm font-medium hover:text-axis-purple">Paket</a>
              <a href="/coverage" className="text-sm font-medium hover:text-axis-purple">Cakupan</a>
              <a href="/help" className="text-sm font-medium hover:text-axis-purple">Bantuan</a>
            </div>
            <a href="/login">
              <button className="rounded-full bg-axis-purple px-6 py-2 text-sm font-bold text-white transition-all hover:scale-105">
                Masuk
              </button>
            </a>
          </div>
        </nav>
        {children}
        <footer className="bg-axis-gray-900 py-12 text-white">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <div className="mb-4 text-3xl font-black italic">AXIS</div>
                <p className="text-sm text-axis-gray-400">Internet Cepat & Hemat untuk semua.</p>
              </div>
              <div>
                <h4 className="mb-4 font-bold">Produk</h4>
                <ul className="space-y-2 text-sm text-axis-gray-400">
                  <li><a href="/packages">Paket Super</a></li>
                  <li><a href="/packages">Paket Home</a></li>
                  <li><a href="/packages">Unlimited</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-bold">Bantuan</h4>
                <ul className="space-y-2 text-sm text-axis-gray-400">
                  <li><a href="/help">FAQ</a></li>
                  <li><a href="/coverage">Area Cakupan</a></li>
                  <li><a href="/help">Hubungi Kami</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-bold">Perusahaan</h4>
                <ul className="space-y-2 text-sm text-axis-gray-400">
                  <li><a href="/about">Tentang Kami</a></li>
                  <li><a href="/careers">Karir</a></li>
                  <li><a href="/legal">Legal</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-axis-gray-800 pt-8 text-center text-sm text-axis-gray-500">
              © 2024 Axis Web Portal. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
