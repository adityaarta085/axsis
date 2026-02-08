import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export default function StatusPage() {
  const regions = [
    { name: 'Jakarta', status: 'operational' },
    { name: 'Bandung', status: 'maintenance' },
    { name: 'Surabaya', status: 'operational' },
    { name: 'Medan', status: 'operational' },
  ];

  return (
    <main className="min-h-screen bg-axis-gray-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black text-axis-purple italic mb-4 text-center">STATUS LAYANAN</h1>
        <p className="text-center text-axis-gray-600 mb-12">Informasi real-time mengenai kondisi jaringan Axis Fiber.</p>

        <Card className="mb-8 bg-green-50 border-green-200">
           <CardContent className="p-8 flex items-center gap-4 text-green-700">
              <CheckCircle size={32} />
              <div>
                 <h3 className="font-bold text-xl">Sistem Operasional</h3>
                 <p className="text-sm opacity-80">Semua sistem inti berfungsi dengan normal.</p>
              </div>
           </CardContent>
        </Card>

        <Card>
           <CardContent className="p-0">
              <div className="divide-y divide-axis-gray-100">
                 {regions.map((region, i) => (
                   <div key={i} className="p-6 flex items-center justify-between">
                      <span className="font-bold">{region.name}</span>
                      <div className="flex items-center gap-2">
                         {region.status === 'operational' ? (
                           <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /> Operasional
                           </span>
                         ) : (
                           <span className="flex items-center gap-1 text-sm text-yellow-600 font-medium">
                              <AlertTriangle size={16} /> Pemeliharaan
                           </span>
                         )}
                      </div>
                   </div>
                 ))}
              </div>
           </CardContent>
        </Card>

        <div className="mt-12 text-center text-sm text-axis-gray-500 flex items-center justify-center gap-2">
           <Clock size={14} /> Terakhir diperbarui: {new Date().toLocaleString()}
        </div>
      </div>
    </main>
  );
}
