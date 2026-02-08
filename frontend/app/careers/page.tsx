import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CareersPage() {
  const jobs = [
    { title: 'Network Engineer', location: 'Jakarta', dept: 'Engineering' },
    { title: 'Fullstack Developer', location: 'Jakarta', dept: 'IT' },
    { title: 'Account Executive', location: 'Surabaya', dept: 'Sales' },
    { title: 'Customer Support', location: 'Remote', dept: 'Support' },
  ];

  return (
    <main className="min-h-screen bg-axis-gray-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black text-axis-purple italic mb-4">KARIR DI AXIS</h1>
        <p className="text-axis-gray-600 mb-12 text-lg">Bergabunglah dengan tim yang mengubah cara Indonesia terhubung.</p>

        <div className="space-y-4">
           {jobs.map((job, i) => (
             <Card key={i}>
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div>
                      <h3 className="font-bold text-xl">{job.title}</h3>
                      <p className="text-sm text-axis-gray-500">{job.dept} • {job.location}</p>
                   </div>
                   <Button variant="outline">Lamar Sekarang</Button>
                </CardContent>
             </Card>
           ))}
        </div>

        <Card className="mt-12 bg-axis-magenta text-white">
           <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Tidak menemukan posisi yang cocok?</h2>
              <p className="text-axis-gray-100 mb-8">Kirimkan CV Anda dan kami akan menghubungi Anda jika ada posisi yang sesuai.</p>
              <Button className="bg-white text-axis-magenta hover:bg-axis-gray-100">Drop Your CV</Button>
           </CardContent>
        </Card>
      </div>
    </main>
  );
}
