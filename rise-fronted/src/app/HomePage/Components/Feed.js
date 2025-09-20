
import React from 'react';

const mockPosts = [
  {
    id: 1,
    user: "WarriorBrother",
    day: 47,
    content: "Crushed that promotion interview today. The energy hit like a freight train after ditching the scroll habit. Brothers, this is real.",
    likes: 23,
    comments: 8,
    timeAgo: "2h",
  },
  {
    id: 2,
    user: "PhoenixRising",
    day: 12,
    content: "Day 12 flatline hitting hard. Transmuted the urge into deadlifts - 315 PR. The fire burns different when you don't waste it.",
    likes: 45,
    comments: 12,
    timeAgo: "4h",
  },
  {
    id: 3,
    user: "StoicForge",
    day: 89,
    content: "Post-breakup day 89. She tried to come back but I'm building something bigger than validation. Energy is currency, spend it wisely.",
    likes: 67,
    comments: 19,
    timeAgo: "6h",
  },
];

const Feed = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-4">
        {mockPosts.map((post, index) => (
          <div key={post.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-semibold text-sm text-foreground">{post.user}</span>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{post.day} day streaker</span>
              <span className="text-muted-foreground text-xs ml-auto">{post.timeAgo}</span>
            </div>
            <p className="text-foreground text-sm leading-relaxed">{post.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feed;
