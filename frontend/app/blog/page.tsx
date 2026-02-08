'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import api from '@/lib/api';
import { Calendar, User } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blog').then(res => {
      setPosts(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-axis-gray-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-center text-4xl font-black text-axis-purple italic">AXIS BLOG</h1>

        {loading ? <p className="text-center">Memuat...</p> : (
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <a key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video w-full bg-axis-gray-200 overflow-hidden">
                    <img src={post.image || 'https://via.placeholder.com/400x225'} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-3 hover:text-axis-purple transition-colors">{post.title}</h2>
                    <div className="flex items-center gap-4 text-xs text-axis-gray-500">
                      <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
