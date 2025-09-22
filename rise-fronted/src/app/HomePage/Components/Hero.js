"use client"

import React from 'react';
import Link from 'next/link';
import { Users, Zap, Target, TrendingUp, Flame, Home } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

// Enhanced Hero with better streak display and simplified navigation
const Hero = ({ activeTab, onTabChange }) => {
  const { streak, isOnboarded } = useUser();

  const quickActions = (
    <div className="flex items-center justify-center gap-4">
      <Link href="/Community" className="flex flex-col items-center gap-1 group">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-200">
          <Users className="w-5 h-5 text-purple-400" />
        </div>
        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Community</span>
      </Link>
      <Link href="/Transmute" className="flex flex-col items-center gap-1 group">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-200">
          <Zap className="w-5 h-5 text-orange-400" />
        </div>
        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Transmute</span>
      </Link>
      <Link href="/Anchor" className="flex flex-col items-center gap-1 group">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-200">
          <Target className="w-5 h-5 text-blue-400" />
        </div>
        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Anchor</span>
      </Link>
      <Link href="/Progress" className="flex flex-col items-center gap-1 group">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-200">
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Progress</span>
      </Link>
    </div>
  );

  return (
    <section className="bg-gradient-to-b from-background to-background/50 border-b border-border/50">
      <div className="container mx-auto px-4 py-6">
        {/* --- MOBILE LAYOUT --- */}
        <div className="md:hidden">
          {/* Enhanced Streak Display */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 px-4 py-2 rounded-full border border-orange-500/20 mb-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">Retained for</span>
            </div>
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
              {streak} days
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {isOnboarded ? "Keep the fire burning, brother 🔥" : "Join 5.2K+ brothers on the journey"}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">{quickActions}</div>

          {/* Simplified Tab Switcher */}
          <div className="max-w-xs mx-auto">
            <div className="flex items-center gap-1 bg-card/50 rounded-lg p-1 border border-border/50">
              <button
                onClick={() => onTabChange("feed")}
                className={`flex items-center justify-center gap-2 flex-1 py-2.5 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "feed"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Flame className="w-4 h-4" />
                Feed
              </button>
              <button
                onClick={() => onTabChange("community")}
                className={`flex items-center justify-center gap-2 flex-1 py-2.5 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "community"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Users className="w-4 h-4" />
                Community
              </button>
            </div>
          </div>
        </div>

        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden md:flex md:items-center md:justify-between">
          {/* Left Column */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">The Forge</h1>
            </div>
            
            {/* Desktop Tab Switcher */}
            <div className="flex items-center gap-1 bg-card/50 rounded-lg p-1 border border-border/50">
              <button
                onClick={() => onTabChange("feed")}
                className={`flex items-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "feed"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Flame className="w-4 h-4" />
                Feed
              </button>
              <button
                onClick={() => onTabChange("community")}
                className={`flex items-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "community"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Users className="w-4 h-4" />
                Community
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex items-center gap-8">
            {/* Enhanced Desktop Streak */}
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">Retained for</span>
              </div>
              <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
                {streak} days
              </div>
            </div>
            {quickActions}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;