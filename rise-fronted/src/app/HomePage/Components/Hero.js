"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Zap, Target, TrendingUp, Flame } from 'lucide-react';

// Note: The Hero component is now a "controlled component".
// It receives the active tab and a function to change the tab via props.
const Hero = ({ activeTab, onTabChange }) => {
  const [userStreak, setUserStreak] = useState(23);

  const iconNav = (
    <div className="flex items-center justify-center gap-6">
      <Link href="/community" className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-card border rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xs text-muted-foreground">Community</span>
      </Link>
      <Link href="/transmute" className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-card border rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xs text-muted-foreground">Transmute</span>
      </Link>
      <Link href="/anchor" className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-card border rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors">
          <Target className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xs text-muted-foreground">Anchor</span>
      </Link>
      <Link href="/spiral" className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-card border rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xs text-muted-foreground">Evolution</span>
      </Link>
    </div>
  );

  const tabSwitcher = (
    <div className="flex items-center gap-2 bg-card rounded-lg p-1">
      <button
        onClick={() => onTabChange("feed")}
        className={`flex items-center gap-2 flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
          activeTab === "feed"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Flame className="w-4 h-4" />
        Feed
      </button>
      <button
        onClick={() => onTabChange("community")}
        className={`flex items-center gap-2 flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
          activeTab === "community"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Users className="w-4 h-4" />
        Community
      </button>
    </div>
  );

  return (
    <section className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-6">
        {/* --- MOBILE LAYOUT --- */}
        <div className="md:hidden">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">You have been retaining for</p>
            <p className="text-lg font-semibold text-primary">{userStreak} days</p>
          </div>
          <div className="mb-4">{iconNav}</div>
          <div className="max-w-xs mx-auto">{tabSwitcher}</div>
        </div>

        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden md:flex md:items-center md:justify-between">
          {/* Left Column */}
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-bold text-foreground">The Forge</h1>
            {tabSwitcher}
          </div>

          {/* Right Column */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">You have been retaining for</p>
              <p className="text-lg font-semibold text-primary">{userStreak} days</p>
            </div>
            {iconNav}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;