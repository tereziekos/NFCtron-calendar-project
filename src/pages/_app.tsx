import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Calendar from '@/components/Calendar';


export default function App({ Component, pageProps }: AppProps) {
  return (
  <div>
    <Calendar events={[]} />
  </div>
  );
}
