
import React from 'react';

const communityThreads = [
  {
    id: 1,
    title: "30 day streak - Energy levels through the roof",
    author: "FocusedWarrior",
    replies: 12,
    timeAgo: "1h",
  },
  {
    id: 2,
    title: "2 day streaker - Need accountability partner",
    author: "NewBeginning",
    replies: 8,
    timeAgo: "3h",
  },
  {
    id: 3,
    title: "Work wins after retention - Promotion secured",
    author: "CareerClimber",
    replies: 15,
    timeAgo: "5h",
  },
];

const Community = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-3">
        {communityThreads.map((thread) => (
          <div key={thread.id} className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-medium text-sm text-foreground mb-1">{thread.title}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>by {thread.author}</span>
              <span>•</span>
              <span>{thread.replies} replies</span>
              <span>•</span>
              <span>{thread.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Community;
