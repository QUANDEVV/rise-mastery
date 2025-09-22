
"use client"

import React, { useState } from 'react';
import { MessageCircle, Copy, Users, Flame, Anchor, Zap } from 'lucide-react';
import { useHaptic } from '@/hooks/useHaptic';
import { useUser } from '@/contexts/UserContext';

const mockPosts = [
  {
    id: 1,
    user: "WarriorBrother",
    day: 47,
    content: "Crushed promo interview—energy like a freight train after ditching scrolls.",
    reactions: { fire: 23, anchor: 5, transmute: 8 },
    comments: 8,
    timeAgo: "2h ago",
    category: "win"
  },
  {
    id: 2,
    user: "PhoenixRising",
    day: 12,
    content: "Day 12 flatline hitting hard. Transmuted urge into deadlifts—315 PR.",
    reactions: { fire: 45, anchor: 12, transmute: 20 },
    comments: 12,
    timeAgo: "4h ago",
    category: "struggle"
  },
  {
    id: 3,
    user: "StoicForge",
    day: 89,
    content: "Post-breakup day 89. Building something bigger than validation. Energy is currency.",
    reactions: { fire: 67, anchor: 15, transmute: 10 },
    comments: 19,
    timeAgo: "6h ago",
    category: "wisdom"
  },
];

const Feed = () => {
  const [userReactions, setUserReactions] = useState({});
  const { lightTap, successTap } = useHaptic();
  const { incrementReactionCount } = useUser();

  const handleReaction = (postId, reactionType) => {
    // Trigger haptic feedback based on reaction type
    if (reactionType === 'fire') {
      successTap(); // Victory reactions get success haptic
    } else {
      lightTap(); // Other reactions get light haptic
    }

    // Track reaction for onboarding trigger
    incrementReactionCount();

    setUserReactions(prev => ({
      ...prev,
      [postId]: reactionType
    }));
  };

  const ReactionButton = ({ type, count, postId, icon: Icon, label }) => {
    const isActive = userReactions[postId] === type;
    return (
      <button
        onClick={() => handleReaction(postId, type)}
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
        }`}
      >
        <Icon className="w-3 h-3" />
        <span>{count}</span>
      </button>
    );
  };

  return (
    <section className="container mx-auto px-4 py-4">
      {/* Community Stats Header */}
      <div className="max-w-2xl mx-auto mb-4 p-3 bg-card/50 rounded-lg border border-border/50">
        <div className="text-center text-sm text-muted-foreground">
          <span className="font-medium text-foreground">5.2K brothers strong</span> • 
          Hot: <span className="text-orange-500">Work Wins (1.2K)</span>, 
          <span className="text-blue-500"> Flatline Fixes (800)</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {mockPosts.map((post, index) => (
          <div key={post.id} className="bg-card border border-border rounded-lg p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-semibold text-sm text-foreground">{post.user}</span>
              <span className="text-xs bg-orange-500/20 text-orange-500 px-2 py-1 rounded-full font-medium">
                {post.day} day streaker
              </span>
              <span className="text-muted-foreground text-xs ml-auto">{post.timeAgo}</span>
            </div>

            {/* Content */}
            <p className="text-foreground text-sm leading-relaxed mb-3">{post.content}</p>

            {/* Reactions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ReactionButton 
                  type="fire" 
                  count={post.reactions.fire} 
                  postId={post.id}
                  icon={Flame}
                  label="Win"
                />
                <ReactionButton 
                  type="anchor" 
                  count={post.reactions.anchor} 
                  postId={post.id}
                  icon={Anchor}
                  label="Struggle"
                />
                <ReactionButton 
                  type="transmute" 
                  count={post.reactions.transmute} 
                  postId={post.id}
                  icon={Zap}
                  label="Transmute"
                />
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="w-3 h-3" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Copy className="w-3 h-3" />
                  <span>Echo</span>
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Users className="w-3 h-3" />
                  <span>Crew</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Engagement Nudge */}
        <div className="text-center py-6">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-4 border border-orange-500/20">
            <p className="text-sm text-muted-foreground mb-2">Retained strong? Share your win below</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              Log a Win
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feed;
