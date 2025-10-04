
import React from 'react';
// Import the shared Header component using the absolute alias used elsewhere
import Header from '@/components/Header/Header';

// HomePage layout with shared header and slot for children
export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
