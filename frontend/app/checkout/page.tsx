'use client';

import React, { useState, useEffect } from 'react';
import { Stepper } from '@/components/ui/Stepper';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/lib/api';

const steps = ['Paket', 'Data Diri', 'Pembayaran'];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [packages, setPackages] = useState<any[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [customerData, setCustomerData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get('/packages');
        setPackages(res.data.data);
      } catch (err) {
        console.error('Failed to fetch packages', err);
      }
    };
    fetchPackages();
  }, []);

  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      const res = await api.post('/checkout', {
        packageId: selectedPackage.id,
        customer: customerData,
        paymentMethod: 'GOPAY', // Default for mock
      });
      setOrder(res.data.data);
      setCurrentStep(3);
    } catch (err) {
      alert('Gagal membuat pesanan');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      await api.post('/checkout/webhook', {
        orderId: order.orderId,
        status: 'paid'
      });
      alert('Pembayaran Berhasil!');
      window.location.href = '/';
    } catch (err) {
      alert('Gagal memproses pembayaran');
    }
  };

  return (
    <main className="min-h-screen bg-axis-gray-50 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-axis-purple">Checkout</h1>
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="mt-12">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Pilih Paket Internet Anda</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {packages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className={`cursor-pointer transition-all ${selectedPackage?.id === pkg.id ? 'ring-2 ring-axis-purple' : ''}`}
                  >
                    <CardContent className="p-4" onClick={() => setSelectedPackage(pkg)}>
                      <h3 className="text-lg font-bold">{pkg.name}</h3>
                      <p className="text-2xl font-black text-axis-purple">Rp {pkg.price.toLocaleString()}</p>
                      <p className="text-sm text-axis-gray-500">{pkg.speed_mbps} Mbps - {pkg.quota}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button
                className="w-full mt-8"
                disabled={!selectedPackage}
                onClick={() => setCurrentStep(2)}
              >
                Lanjut ke Data Diri
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Informasi Pelanggan</h2>
              <Card>
                <CardContent className="space-y-4">
                  <Input
                    label="Nama Lengkap"
                    placeholder="Contoh: Budi Santoso"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                  />
                  <Input
                    label="Nomor HP"
                    placeholder="Contoh: 08123456789"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                  />
                </CardContent>
              </Card>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setCurrentStep(1)}>Kembali</Button>
                <Button
                  className="flex-1"
                  disabled={!customerData.name || !customerData.phone}
                  isLoading={loading}
                  onClick={handleCreateOrder}
                >
                  Lanjut ke Pembayaran
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-6">
              <h2 className="text-xl font-bold">Simulasi Pembayaran</h2>
              <Card>
                <CardContent className="p-12">
                  <p className="text-axis-gray-600 mb-2">Total Tagihan</p>
                  <p className="text-4xl font-black text-axis-purple">Rp {selectedPackage.price.toLocaleString()}</p>
                  <p className="mt-4 text-sm text-axis-gray-500">ID Pesanan: {order?.orderId}</p>
                </CardContent>
              </Card>
              <div className="flex flex-col gap-3">
                <Button onClick={handlePaymentSuccess}>Simulasi Bayar Berhasil</Button>
                <Button variant="outline" onClick={() => alert('Pembayaran Gagal')}>Simulasi Bayar Gagal</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
