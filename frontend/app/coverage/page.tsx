'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/lib/api';
import { MapPin, CheckCircle2, XCircle, Zap } from 'lucide-react';

export default function CoveragePage() {
  const [postcode, setPostcode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/coverage?postcode=${postcode}`);
      setResult(res.data.data);
    } catch (err) {
      alert('Terjadi kesalahan saat mengecek cakupan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-axis-gray-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-axis-purple italic">CAKUPAN AREA</h1>
          <p className="mt-4 text-axis-gray-600 text-lg">Cek apakah rumahmu sudah terjangkau jaringan super cepat Axis.</p>
        </div>

        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input
                placeholder="Masukkan 5 digit kode pos"
                maxLength={5}
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
              <Button className="sm:w-48" isLoading={loading} onClick={handleCheck}>Cek Sekarang</Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className={`border-l-8 ${result.supported ? 'border-green-500' : 'border-red-500'}`}>
            <CardContent className="p-8 flex items-start gap-6">
              <div className={`p-3 rounded-full ${result.supported ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {result.supported ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  {result.supported ? 'Hore! Area Tercover' : 'Maaf, Belum Tercover'}
                </h3>
                {result.supported ? (
                  <>
                    <p className="text-axis-gray-600 mb-4">Area <b>{result.city}</b> sudah mendukung kecepatan hingga <b>{result.expected_speed_mbps} Mbps</b>.</p>
                    <a href="/checkout">
                      <Button>Daftar Sekarang</Button>
                    </a>
                  </>
                ) : (
                  <p className="text-axis-gray-600">{result.notes}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-20 grid gap-8 md:grid-cols-2">
           <div className="flex gap-4">
              <div className="bg-axis-purple text-white p-3 rounded-xl h-fit"><MapPin /></div>
              <div>
                <h4 className="font-bold">Lokasi Strategis</h4>
                <p className="text-sm text-axis-gray-500">Kami fokus pada area perumahan dan perkantoran padat.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="bg-axis-purple text-white p-3 rounded-xl h-fit"><Zap /></div>
              <div>
                <h4 className="font-bold">Instalasi Kilat</h4>
                <p className="text-sm text-axis-gray-500">Setelah area tercover, pemasangan dilakukan dalam 1-2 hari kerja.</p>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
