'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Zap, Shield, Clock, HelpCircle } from 'lucide-react';

export default function PackageDetailPage() {
  const { id } = useParams();
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get(`/packages/${id}`).then(res => {
        setPkg(res.data.data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="p-20 text-center">Memuat...</div>;
  if (!pkg) return <div className="p-20 text-center">Paket tidak ditemukan.</div>;

  return (
    <main className="min-h-screen bg-axis-gray-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">
           <div className="md:col-span-2 space-y-8">
              <Card>
                 <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <h1 className="text-3xl font-black italic text-axis-purple">{pkg.name}</h1>
                          <p className="text-axis-gray-500">{pkg.category.toUpperCase()}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-3xl font-black italic">Rp {pkg.price.toLocaleString()}</p>
                          <p className="text-xs text-axis-gray-400">Termasuk Pajak</p>
                       </div>
                    </div>
                    <p className="text-axis-gray-600 mb-8 text-lg">{pkg.description}</p>
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-axis-gray-100">
                       <div className="text-center">
                          <Zap className="mx-auto text-axis-purple mb-2" />
                          <p className="text-xs text-axis-gray-500 uppercase">Speed</p>
                          <p className="font-bold">{pkg.speed_mbps} Mbps</p>
                       </div>
                       <div className="text-center">
                          <Shield className="mx-auto text-axis-purple mb-2" />
                          <p className="text-xs text-axis-gray-500 uppercase">Kuota</p>
                          <p className="font-bold">{pkg.quota}</p>
                       </div>
                       <div className="text-center">
                          <Clock className="mx-auto text-axis-purple mb-2" />
                          <p className="text-xs text-axis-gray-500 uppercase">Masa Aktif</p>
                          <p className="font-bold">30 Hari</p>
                       </div>
                    </div>
                 </CardContent>
              </Card>

              <Card>
                 <CardContent className="p-8">
                    <h3 className="font-bold text-xl mb-6">Fitur & Manfaat</h3>
                    <ul className="space-y-4">
                       {(pkg.features || []).map((f: string, i: number) => (
                         <li key={i} className="flex items-center gap-3">
                            <div className="bg-green-100 text-green-600 p-1 rounded-full"><Zap size={14} /></div>
                            <span>{f}</span>
                         </li>
                       ))}
                    </ul>
                 </CardContent>
              </Card>
           </div>

           <div className="space-y-6">
              <Card className="bg-axis-purple text-white">
                 <CardContent className="p-8 text-center">
                    <h4 className="font-bold mb-4">Tertarik dengan paket ini?</h4>
                    <p className="text-sm text-axis-gray-200 mb-8">Daftar sekarang dan nikmati instalasi gratis!</p>
                    <a href={`/checkout?pkg=${pkg.id}`}>
                      <Button className="w-full bg-white text-axis-purple hover:bg-axis-gray-100">Beli Sekarang</Button>
                    </a>
                 </CardContent>
              </Card>

              <Card>
                 <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4 text-axis-purple">
                       <HelpCircle />
                       <h4 className="font-bold">Butuh Bantuan?</h4>
                    </div>
                    <p className="text-sm text-axis-gray-500 mb-4">Tanya kami tentang paket ini atau cek area cakupan Anda.</p>
                    <Button variant="outline" className="w-full" size="sm">Hubungi CS</Button>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </main>
  );
}
