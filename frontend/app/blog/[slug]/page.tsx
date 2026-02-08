'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      api.get(`/blog/${slug}`).then(res => {
        setPost(res.data.data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) return <div className="p-20 text-center">Memuat...</div>;
  if (!post) return <div className="p-20 text-center">Artikel tidak ditemukan.</div>;

  return (
    <main className="min-h-screen bg-white px-4 py-20 md:px-8">
      <div className="mx-auto max-w-3xl">
        <a href="/blog">
          <Button variant="ghost" size="sm" className="mb-8"><ArrowLeft size={16} className="mr-2" /> Kembali ke Blog</Button>
        </a>

        <img src={post.image || 'https://via.placeholder.com/800x450'} alt={post.title} className="w-full rounded-3xl mb-8" />

        <h1 className="text-4xl font-black text-axis-gray-900 mb-6">{post.title}</h1>

        <div className="flex items-center gap-6 text-sm text-axis-gray-500 mb-12 pb-8 border-b">
           <span className="flex items-center gap-2 font-medium text-axis-purple"><User size={18} /> {post.author}</span>
           <span className="flex items-center gap-2"><Calendar size={18} /> {new Date(post.created_at).toLocaleDateString()}</span>
        </div>

        <div className="prose prose-lg max-w-none text-axis-gray-700 leading-relaxed">
           {post.content}
        </div>
      </div>
    </main>
  );
}
