'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/user/me');
        setUser(res.data.data);
      } catch (err) {
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-12 text-center">Memuat...</div>;

  return (
    <main className="min-h-screen bg-axis-gray-50 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Halo, {user?.name || user?.phone}!</h1>
          <Button variant="outline" size="sm" onClick={() => { localStorage.clear(); window.location.href = '/'; }}>Keluar</Button>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader><h2 className="font-bold">Paket Aktif</h2></CardHeader>
            <CardContent>
              {user?.orders?.filter((o: any) => o.status === 'paid').length > 0 ? (
                <div className="space-y-4">
                  {user.orders.filter((o: any) => o.status === 'paid').map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-bold">{order.package.name}</p>
                        <p className="text-sm text-axis-gray-500">Berlaku sampai: 30 Hari Lagi</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-axis-purple">Sisa 24.5 GB</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-axis-gray-500">
                  <p>Anda belum memiliki paket aktif.</p>
                  <Button variant="ghost" className="mt-4" onClick={() => window.location.href = '/packages'}>Beli Paket</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><h2 className="font-bold">Quick Actions</h2></CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="sm">Isi Pulsa</Button>
              <Button variant="outline" className="w-full" size="sm">Cek Kuota</Button>
              <Button variant="ghost" className="w-full" size="sm">Bantuan</Button>
            </CardContent>
          </Card>
        </div>

        <h2 className="mt-12 mb-6 text-xl font-bold">Riwayat Transaksi</h2>
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-left">
              <thead className="bg-axis-gray-50 text-xs uppercase text-axis-gray-500">
                <tr>
                  <th className="px-6 py-3">Tanggal</th>
                  <th className="px-6 py-3">Produk</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-axis-gray-100">
                {user?.orders?.map((order: any) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-medium">{order.package.name}</td>
                    <td className="px-6 py-4 text-sm font-bold">Rp {order.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`rounded-full px-2 py-1 text-xs font-bold ${order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.status === 'paid' ? 'BERHASIL' : 'PENDING'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
