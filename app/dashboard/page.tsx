// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NewClipForm from '../components/NewClipForm';
import ClipCard from '../components/ClipCard';

type Clip = {
  _id: string;
  title: string;
  content: string;
  url?: string;
  tags: string[];
  createdAt: string;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchClips = async () => {
      if (status !== 'authenticated') return;
      
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clips`, {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch clips');
        }

        const data = await res.json();
        setClips(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClips();
  }, [session, status]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
  };

  const addClip = (newClip: Clip) => {
    setClips([newClip, ...clips]);
  };

  const deleteClip = async (id: string) => {
    if (!confirm('Are you sure you want to delete this clip?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clips/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete clip');
      }

      setClips(clips.filter(clip => clip._id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (status === 'loading' || loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your SavePoint Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-8">
        <NewClipForm onAddClip={addClip} token={session?.user.token} />
      </div>
      
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clips..."
            className="flex-grow px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>
      </div>
      
      {clips.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded">
          <p className="text-lg text-gray-600">You don't have any clips yet</p>
          <p className="text-gray-500">Use the form above to create your first clip</p>
        </div>
      ) : (
        <div className="space-y-4">
          {clips.map((clip) => (
            <ClipCard
              key={clip._id}
              clip={clip}
              onDelete={() => deleteClip(clip._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}