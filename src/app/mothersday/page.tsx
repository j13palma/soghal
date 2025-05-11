'use client';
import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('@components/ThreeScene'), { ssr: false });

export default function mothersDay() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ThreeScene />
    </div>
  );
}
