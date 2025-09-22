
"use client"

import React, { useState } from 'react';
import { MessageCircle, Users, Mic, Clock, TrendingUp, Flame, Target, Zap } from 'lucide-react';

const communityThreads = [
  {
    id: 1,
    title: "30 day streak - Energy levels through the roof",
    author: "FocusedWarrior",
    authorStreak: 30,
    replies: 12,
    timeAgo: "1h ago",
    category: "win",
    isHot: true,
    preview: "Brothers, the energy is unreal. Gym PRs, work focus, everything clicking..."
  },
  {
    id: 2,
    title: "Day 2 - Need accountability partner for flatline phase",
    author: "NewBeginning",
    authorStreak: 2,
    replies: 8,
    timeAgo: "3h ago",
    category: "support",
    isHot: false,
    preview: "First time trying SR seriously. Heard flatlines are rough, looking for..."
  },
  {
    id: 3,
    title: "Work promotion secured after 60 days retention",
    author: "CareerClimber",
    authorStreak: 67,
    replies: 15,
    timeAgo: "5h ago",
    category: "win",
    isHot: true,
    preview: "The confidence boost is real. Walked into that meeting like I owned..."
  },
  {
    id: 4,
    title: "Urge Circles - Live support session starting in 10min",
    author: "CommunityBot",
    authorStreak: null,
    replies: 23,
    timeAgo: "8min ago",
    category: "live",
    isHot: true,
    preview: "Join brothers dealing with urges right now. Voice-only, anonymous..."
  },
];

const Community = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', icon: Users },
    { id: 'hot', label: 'Hot', icon: Flame },
    { id: 'support', label: 'Support', icon: Target },
    { id: 'wins', label: 'Wins', icon: TrendingUp },
    { id: 'live', label: 'Live', icon: Mic },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'win': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'support': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'live': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-muted-foreground bg-secondary/50 border-border';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'win': return 'Win';
      case 'support': return 'Support';
      case 'live': return 'Live';
      default: return 'Discussion';
    }
  };

  return (
    <section className="container mx-auto px-4 py-4">
      {/* Community Stats */}
      <div className="max-w-2xl mx-auto mb-4">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/20">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-bold text-foreground">5.2K</div>
                <div className="text-muted-foreground text-xs">Brothers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-500">847</div>
                <div className="text-muted-foreground text-xs">Online</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-orange-500">23</div>
                <div className="text-muted-foreground text-xs">Live Circles</div>
              </div>
            </div>
            <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors">
              Join Circle
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-2xl mx-auto mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <filter.icon className="w-3 h-3" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Threads */}
      <div className="max-w-2xl mx-auto space-y-3">
        {communityThreads.map((thread) => (
          <div key={thread.id} className="bg-card border border-border rounded-lg p-4 hover:border-border/80 transition-colors">
            {/* Thread Header */}
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {thread.isHot && (
                    <div className="flex items-center gap-1 text-xs text-orange-500">
                      <Flame className="w-3 h-3" />
                      <span>Hot</span>
                    </div>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getCategoryColor(thread.category)}`}>
                    {getCategoryLabel(thread.category)}
                  </span>
                  {thread.category === 'live' && (
                    <div className="flex items-center gap-1 text-xs text-red-500">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span>Live</span>
                    </div>
                  )}
                </div>
                <h4 className="font-medium text-sm text-foreground mb-1 line-clamp-2">{thread.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{thread.preview}</p>
              </div>
            </div>

            {/* Thread Meta */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span>by {thread.author}</span>
                  {thread.authorStreak && (
                    <span className="text-orange-500 font-medium">({thread.authorStreak}d)</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{thread.timeAgo}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{thread.replies}</span>
                </div>
                {thread.category === 'live' && (
                  <button className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium hover:bg-red-600 transition-colors">
                    Join
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Create Thread CTA */}
        <div className="text-center py-6">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
            <p className="text-sm text-muted-foreground mb-3">Share your journey with the brotherhood</p>
            <div className="flex gap-2 justify-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                Start Thread
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                Join Circle
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
