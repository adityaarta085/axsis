'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Search, MapPin, Zap, Smartphone } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-axis-purple py-20 text-white md:py-32">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-axis-magenta/20 to-transparent opacity-50" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-5xl font-black leading-tight md:text-7xl">
              Internet Cepat <br />
              <span className="text-axis-yellow italic">Tanpa Tapi!</span>
            </h1>
            <p className="mb-10 text-xl text-axis-gray-100">
              Mulai Rp49.000/bulan. Nikmati koneksi fiber optic super cepat untuk streaming, gaming, dan kerja di rumah.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="/packages">
                <Button size="lg" className="w-full bg-axis-yellow text-axis-purple hover:bg-white sm:w-auto">
                  Lihat Paket
                </Button>
              </a>
              <a href="/coverage">
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10 sm:w-auto">
                  Cek Area Kamu
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-axis-purple/10 text-axis-purple">
                <Zap size={32} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Kecepatan Tinggi</h3>
              <p className="text-axis-gray-500">Hingga 300 Mbps untuk semua kebutuhan digital keluarga Anda.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-axis-magenta/10 text-axis-magenta">
                <Smartphone size={32} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Pendaftaran Mudah</h3>
              <p className="text-axis-gray-500">Cukup daftar online dalam 5 menit, teknisi kami akan segera datang.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-axis-yellow/20 text-axis-purple">
                <MapPin size={32} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Cakupan Luas</h3>
              <p className="text-axis-gray-500">Hadir di kota-kota besar di seluruh Indonesia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Select Packages Preview */}
      <section className="bg-axis-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black md:text-4xl">Pilih Paket Terpopuler</h2>
            <p className="mt-4 text-axis-gray-600">Pilihan terbaik untuk berbagai kebutuhan.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
             <Card className="flex flex-col border-2 border-axis-purple">
                <div className="bg-axis-purple px-4 py-1 text-center text-xs font-bold text-white uppercase">Paling Populer</div>
                <CardContent className="flex-1 p-8 text-center">
                  <h4 className="text-xl font-bold">Axis Super 50</h4>
                  <p className="mt-4 text-4xl font-black text-axis-purple">Rp 89.000</p>
                  <p className="text-sm text-axis-gray-500">per bulan</p>
                  <hr className="my-6 border-axis-gray-100" />
                  <ul className="space-y-3 text-sm text-axis-gray-600">
                    <li>Speed up to 50 Mbps</li>
                    <li>Unlimited (FUP 100GB)</li>
                    <li>Gratis Biaya Pasang</li>
                  </ul>
                  <a href="/checkout?pkg=axis-super-50">
                    <Button className="mt-8 w-full">Pilih Paket</Button>
                  </a>
                </CardContent>
             </Card>

             <Card className="flex flex-col">
                <CardContent className="flex-1 p-8 text-center">
                  <h4 className="text-xl font-bold">Axis Home 100</h4>
                  <p className="mt-4 text-4xl font-black text-axis-purple">Rp 149.000</p>
                  <p className="text-sm text-axis-gray-500">per bulan</p>
                  <hr className="my-6 border-axis-gray-100" />
                  <ul className="space-y-3 text-sm text-axis-gray-600">
                    <li>Speed up to 100 Mbps</li>
                    <li>Unlimited Tanpa FUP</li>
                    <li>Gratis Router WiFi</li>
                  </ul>
                  <a href="/checkout?pkg=axis-home-100">
                    <Button className="mt-8 w-full">Pilih Paket</Button>
                  </a>
                </CardContent>
             </Card>

             <Card className="flex flex-col">
                <CardContent className="flex-1 p-8 text-center">
                  <h4 className="text-xl font-bold">Unlimited Pro</h4>
                  <p className="mt-4 text-4xl font-black text-axis-purple">Rp 349.000</p>
                  <p className="text-sm text-axis-gray-500">per bulan</p>
                  <hr className="my-6 border-axis-gray-100" />
                  <ul className="space-y-3 text-sm text-axis-gray-600">
                    <li>Speed up to 300 Mbps</li>
                    <li>Truly Unlimited</li>
                    <li>VIP Support 24/7</li>
                  </ul>
                  <a href="/checkout?pkg=axis-unlimited-pro">
                    <Button className="mt-8 w-full">Pilih Paket</Button>
                  </a>
                </CardContent>
             </Card>
          </div>
        </div>
      </section>

      {/* Coverage Mini App */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <Card className="bg-axis-purple p-12 text-white overflow-visible">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-4xl font-black mb-4">Cek Area Kamu</h2>
                <p className="text-axis-gray-200">Ketik kode pos kamu untuk melihat apakah area kamu sudah terjangkau oleh jaringan Axis Fiber.</p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Masukkan Kode Pos"
                  className="w-full rounded-full bg-white px-8 py-4 text-lg text-axis-purple outline-none"
                />
                <Button className="absolute right-2 top-2 h-12 w-12 rounded-full p-0">
                  <Search size={24} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
