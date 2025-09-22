"use client"

import React, { useState, useEffect } from 'react';
import { Flame, Trophy, Target, Zap, Star } from 'lucide-react';

const StreakCelebration = ({ streak, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getMilestoneData = (streak) => {
    if (streak >= 90) return { icon: Trophy, color: 'from-yellow-400 to-orange-500', title: 'Legend Status', message: 'You are among the elite 1%' };
    if (streak >= 60) return { icon: Star, color: 'from-purple-400 to-pink-500', title: 'Master Level', message: 'Incredible discipline, brother' };
    if (streak >= 30) return { icon: Flame, color: 'from-orange-400 to-red-500', title: 'Fire Keeper', message: 'The flame burns strong' };
    if (streak >= 14) return { icon: Target, color: 'from-blue-400 to-cyan-500', title: 'Focused Warrior', message: 'Two weeks of pure focus' };
    if (streak >= 7) return { icon: Zap, color: 'from-green-400 to-emerald-500', title: 'Energy Rising', message: 'First week conquered' };
    return { icon: Flame, color: 'from-orange-400 to-red-500', title: 'Journey Begins', message: 'Every master was once a beginner' };
  };

  const milestoneData = getMilestoneData(streak);
  const Icon = milestoneData.icon;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className={`bg-card border border-border rounded-2xl p-8 mx-4 max-w-sm w-full text-center transform transition-all duration-500 ${
        isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        {/* Animated Icon */}
        <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${milestoneData.color} flex items-center justify-center animate-pulse`}>
          <Icon className="w-10 h-10 text-white" />
        </div>

        {/* Streak Number */}
        <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${milestoneData.color} bg-clip-text text-transparent`}>
          {streak}
        </div>
        <div className="text-sm text-muted-foreground mb-4">Days Strong</div>

        {/* Milestone Title */}
        <h3 className="text-xl font-bold text-foreground mb-2">{milestoneData.title}</h3>
        <p className="text-sm text-muted-foreground mb-6">{milestoneData.message}</p>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {[7, 14, 30, 60, 90].map((milestone) => (
            <div
              key={milestone}
              className={`w-2 h-2 rounded-full transition-colors ${
                streak >= milestone ? `bg-gradient-to-r ${milestoneData.color}` : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Next Milestone */}
        {streak < 90 && (
          <div className="text-xs text-muted-foreground">
            Next milestone: {[7, 14, 30, 60, 90].find(m => m > streak)} days
          </div>
        )}
      </div>
    </div>
  );
};

export default StreakCelebration;