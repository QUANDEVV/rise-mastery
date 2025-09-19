
import React from 'react';
import Link from 'next/link';


// Header component is now sticky at the top using Tailwind's sticky and top-0 classes
const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      {/* The z-50 ensures the header stays above other content */}
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* ...existing code... */}
        <div className="flex items-center">
          {/* Use Next.js Link for navigation */}
          <Link href="/" className="text-2xl font-bold">Mastery</Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-gray-400">Home</Link></li>
            <li><Link href="/about" className="hover:text-gray-400">About</Link></li>
            <li><Link href="/courses" className="hover:text-gray-400">Courses</Link></li>
            <li><Link href="/contact" className="hover:text-gray-400">Contact</Link></li>
          </ul>
        </nav>
        {/* Sign Up button removed for cleaner navigation */}
      </div>
    </header>
  );
};

export default Header;
