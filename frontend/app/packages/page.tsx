'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import { Zap, Shield, Clock } from 'lucide-react';

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/packages').then(res => {
      setPackages(res.data.data);
      setLoading(false);
    });
  }, []);

  const filtered = filter === 'all' ? packages : packages.filter(p => p.category === filter);

  return (
    <main className="min-h-screen bg-axis-gray-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-axis-purple italic">PILIH PAKETMU</h1>
          <p className="mt-4 text-axis-gray-600">Berbagai pilihan paket internet fiber untuk gaya hidup digitalmu.</p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
           {['all', 'super', 'home', 'unlimited'].map((f) => (
             <Button
               key={f}
               variant={filter === f ? 'primary' : 'outline'}
               size="sm"
               onClick={() => setFilter(f)}
               className="capitalize"
             >
               {f}
             </Button>
           ))}
        </div>

        {loading ? <p className="text-center">Memuat...</p> : (
          <div className="grid gap-8 md:grid-cols-3">
            {filtered.map((pkg) => (
              <Card key={pkg.id} className="relative group overflow-visible">
                {pkg.tag && (
                  <div className="absolute -top-3 -right-3 bg-axis-magenta text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                    {pkg.tag}
                  </div>
                )}
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-1">{pkg.name}</h2>
                  <p className="text-sm text-axis-gray-500 mb-6">{pkg.category.toUpperCase()}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-axis-purple italic">Rp {pkg.price.toLocaleString()}</span>
                    <span className="text-sm text-axis-gray-500">/bulan</span>
                  </div>

                  <hr className="mb-6 border-axis-gray-100" />

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm">
                       <Zap size={18} className="text-axis-purple" />
                       <span className="font-bold">{pkg.speed_mbps} Mbps</span> Speed
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                       <Shield size={18} className="text-axis-purple" />
                       {pkg.quota}
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                       <Clock size={18} className="text-axis-purple" />
                       Akses 24 Jam
                    </li>
                  </ul>

                  <a href={`/checkout?pkg=${pkg.id}`}>
                    <Button className="w-full group-hover:scale-105 transition-transform">Pilih Paket</Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
