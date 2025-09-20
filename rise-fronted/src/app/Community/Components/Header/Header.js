import React from 'react';

// Custom Community Header
const CommunityHeader = () => {
  return (
    <header className="bg-purple-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold">Community Zone</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/Community" className="hover:text-purple-300">Home</a></li>
            <li><a href="/Community/events" className="hover:text-purple-300">Events</a></li>
            <li><a href="/Community/members" className="hover:text-purple-300">Members</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default CommunityHeader;
