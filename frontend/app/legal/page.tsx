import React from 'react';

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-20 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black text-axis-purple italic mb-8">SYARAT & KETENTUAN</h1>
        <div className="prose prose-purple max-w-none text-axis-gray-700 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-axis-gray-900">1. Ketentuan Umum</h2>
            <p>Layanan Axis Fiber disediakan oleh PT Axis Telekomunikasi Indonesia. Dengan menggunakan layanan ini, Anda setuju untuk terikat oleh syarat dan ketentuan ini.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-axis-gray-900">2. Pendaftaran Layanan</h2>
            <p>Pelanggan wajib memberikan data diri yang benar dan valid. Aktivasi layanan akan dilakukan setelah survei lokasi dan pembayaran pertama berhasil dikonfirmasi.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-axis-gray-900">3. Kebijakan Privasi</h2>
            <p>Kami menjaga privasi data Anda sesuai dengan hukum yang berlaku di Republik Indonesia. Data Anda digunakan untuk kepentingan penyediaan layanan dan penagihan.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-axis-gray-900">4. Pembatalan</h2>
            <p>Pembatalan layanan dapat dilakukan dengan pemberitahuan minimal 30 hari sebelumnya. Perangkat router wajib dikembalikan dalam kondisi baik.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
