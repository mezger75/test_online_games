'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function DetailsPage() {
  const params = useParams();
  const gameTitle = decodeURIComponent(params.title.toString());

  return (
    <div className='flex justify-center items-center h-screen'>
      <Link href={'/'}>
        <button className='absolute top-5 left-5 px-12 py-3 border rounded my-5 hover:bg-slate-100 active:translate-y-[3px] transition-transform uppercase text-sm shadow-md font-semibold'>
          Back Home
        </button>
      </Link>
      <h1 className='text-3xl font-bold'>{gameTitle}</h1>
    </div>
  );
}
