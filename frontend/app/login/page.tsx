'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/lib/api';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [requestId, setRequestId] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async () => {
    setLoading(true);
    try {
      const res = await api.post('/auth/otp', { phone });
      setRequestId(res.data.data.requestId);
      setStep(2);
    } catch (err) {
      alert('Gagal mengirim OTP. Pastikan format benar.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await api.post('/auth/verify', { requestId, code: otp });
      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.data.user));
      window.location.href = '/dashboard';
    } catch (err) {
      alert('OTP Salah atau Kadaluarsa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <h1 className="mb-2 text-2xl font-bold text-axis-purple">Masuk ke MyAxis</h1>
          <p className="mb-8 text-axis-gray-500">Gunakan nomor Axis Anda untuk masuk.</p>

          {step === 1 ? (
            <div className="space-y-6">
              <Input
                label="Nomor HP"
                placeholder="08xxxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button className="w-full" isLoading={loading} onClick={handleRequestOtp}>
                Lanjut
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-axis-gray-600">
                Kami telah mengirimkan kode 6-digit ke <b>{phone}</b>
              </p>
              <Input
                label="Kode OTP"
                placeholder="123456"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button className="w-full" isLoading={loading} onClick={handleVerifyOtp}>
                Verifikasi
              </Button>
              <button
                className="w-full text-center text-sm text-axis-purple font-medium"
                onClick={() => setStep(1)}
              >
                Ganti Nomor
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
