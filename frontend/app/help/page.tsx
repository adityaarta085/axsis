'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import api from '@/lib/api';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

export default function HelpPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    api.get('/faqs').then(res => {
      setFaqs(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-white px-4 py-20 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-axis-purple italic mb-4">PUSAT BANTUAN</h1>
          <div className="relative max-w-md mx-auto">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-axis-gray-400" size={20} />
             <input type="text" placeholder="Cari bantuan..." className="w-full rounded-full border border-axis-gray-200 py-3 pl-12 pr-4 outline-none focus:border-axis-purple" />
          </div>
        </div>

        <div className="space-y-4">
          {loading ? <p className="text-center">Memuat...</p> : faqs.map((faq) => (
            <Card key={faq.id} className="cursor-pointer" onClick={() => setOpenId(openId === faq.id ? null : faq.id)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                  {openId === faq.id ? <ChevronUp /> : <ChevronDown />}
                </div>
                {openId === faq.id && (
                  <div className="mt-4 text-axis-gray-600 border-t pt-4 animate-in fade-in slide-in-from-top-2">
                    {faq.answer}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-axis-gray-900 text-white">
           <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Masih butuh bantuan?</h2>
              <p className="text-axis-gray-400 mb-8">Hubungi tim customer service kami yang tersedia 24/7.</p>
              <Button>Hubungi Kami via WhatsApp</Button>
           </CardContent>
        </Card>
      </div>
    </main>
  );
}
