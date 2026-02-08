import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-axis-purple text-white py-20 text-center">
         <h1 className="text-5xl font-black italic mb-4">TENTANG AXIS</h1>
         <p className="text-xl text-axis-gray-200">Membawa koneksi masa depan untuk Indonesia.</p>
      </section>

      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
               <h2 className="text-3xl font-bold mb-6">Misi Kami</h2>
               <p className="text-axis-gray-600 text-lg leading-relaxed">
                  Axis berkomitmen untuk menyediakan layanan internet berkualitas tinggi yang terjangkau oleh seluruh lapisan masyarakat Indonesia. Kami percaya bahwa akses informasi adalah hak semua orang.
               </p>
            </div>
            <div className="bg-axis-gray-100 aspect-square rounded-3xl"></div>
         </div>

         <div className="mt-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Nilai-Nilai Kami</h2>
            <div className="grid md:grid-cols-3 gap-8">
               <Card><CardContent className="p-8 text-center">
                  <h4 className="font-bold text-xl mb-4">Inovatif</h4>
                  <p className="text-sm text-axis-gray-500">Selalu mencari cara baru untuk memberikan yang terbaik.</p>
               </CardContent></Card>
               <Card><CardContent className="p-8 text-center">
                  <h4 className="font-bold text-xl mb-4">Terjangkau</h4>
                  <p className="text-sm text-axis-gray-500">Kualitas premium dengan harga yang masuk akal.</p>
               </CardContent></Card>
               <Card><CardContent className="p-8 text-center">
                  <h4 className="font-bold text-xl mb-4">Terpercaya</h4>
                  <p className="text-sm text-axis-gray-500">Koneksi stabil yang bisa diandalkan kapan saja.</p>
               </CardContent></Card>
            </div>
         </div>
      </section>
    </main>
  );
}
