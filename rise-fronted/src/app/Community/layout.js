
import React from 'react';
import CommunityHeader from './Components/Header/Header';
import CommunityFooter from './Components/Footer/Footer';
import { MobileNav } from '@/components/MobileNav/MobileNav';

// Community layout with its own header and footer
export default function Layout({ children }) {
  return (
    <>
      {/* Custom Community Header */}
      <CommunityHeader />
      {/* Main Community Content */}
      {children}
      {/* Custom Community Footer */}
      <CommunityFooter />
      <MobileNav />
    </>
  );
}
