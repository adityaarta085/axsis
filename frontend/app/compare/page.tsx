'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import api from '@/lib/api';
import { Check, X } from 'lucide-react';

export default function ComparePage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/packages').then(res => {
      setPackages(res.data.data.slice(0, 3)); // Compare top 3
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-20 text-center">Memuat...</div>;

  const features = [
    'Kecepatan (Up to)',
    'Kuota / FUP',
    'Gratis Instalasi',
    'WiFi Router',
    'Dukungan 24/7',
    'Akses Hiburan'
  ];

  return (
    <main className="min-h-screen bg-white px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-center text-4xl font-black text-axis-purple italic">BANDINGKAN PAKET</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="p-6 text-left border-b bg-axis-gray-50 rounded-tl-3xl w-1/4">Fitur Utama</th>
                {packages.map((pkg) => (
                  <th key={pkg.id} className="p-6 border-b">
                    <p className="font-bold text-xl">{pkg.name}</p>
                    <p className="text-axis-purple font-black">Rp {pkg.price.toLocaleString()}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-axis-gray-100">
              <tr>
                 <td className="p-6 text-left font-medium bg-axis-gray-50 italic">Kecepatan</td>
                 {packages.map(p => <td key={p.id} className="p-6 font-bold">{p.speed_mbps} Mbps</td>)}
              </tr>
              <tr>
                 <td className="p-6 text-left font-medium bg-axis-gray-50 italic">Kuota</td>
                 {packages.map(p => <td key={p.id} className="p-6">{p.quota}</td>)}
              </tr>
              <tr>
                 <td className="p-6 text-left font-medium bg-axis-gray-50 italic">Instalasi</td>
                 {packages.map(p => <td key={p.id} className="p-6 text-green-600"><Check className="mx-auto" /></td>)}
              </tr>
              <tr>
                 <td className="p-6 text-left font-medium bg-axis-gray-50 italic">WiFi Router</td>
                 {packages.map(p => <td key={p.id} className="p-6 text-green-600"><Check className="mx-auto" /></td>)}
              </tr>
              <tr>
                 <td className="p-6 text-left font-medium bg-axis-gray-50 italic">Hiburan</td>
                 {packages.map(p => <td key={p.id} className="p-6 text-axis-gray-300"><X className="mx-auto" /></td>)}
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="p-6 bg-axis-gray-50 rounded-bl-3xl"></td>
                {packages.map(p => (
                  <td key={p.id} className="p-6">
                    <a href={`/checkout?pkg=${p.id}`}>
                      <button className="bg-axis-purple text-white px-6 py-2 rounded-full font-bold text-sm">Pilih Paket</button>
                    </a>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </main>
  );
}
