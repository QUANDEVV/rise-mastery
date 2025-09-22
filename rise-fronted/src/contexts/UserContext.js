"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [streak, setStreak] = useState(0);
  const [goals, setGoals] = useState([]);
  const [scrollCount, setScrollCount] = useState(0);
  const [reactionCount, setReactionCount] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('forgeUser');
    const savedOnboarded = localStorage.getItem('forgeOnboarded');
    const savedStreak = localStorage.getItem('forgeStreak');
    const savedGoals = localStorage.getItem('forgeGoals');
    const savedScrollCount = localStorage.getItem('forgeScrollCount');
    const savedReactionCount = localStorage.getItem('forgeReactionCount');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedOnboarded) {
      setIsOnboarded(JSON.parse(savedOnboarded));
    }
    
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
    
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }

    if (savedScrollCount) {
      setScrollCount(parseInt(savedScrollCount));
    }

    if (savedReactionCount) {
      setReactionCount(parseInt(savedReactionCount));
    }

    // Show onboarding if user hasn't been onboarded and has scrolled 3+ times or reacted once
    if (!savedOnboarded && (parseInt(savedScrollCount || 0) >= 3 || parseInt(savedReactionCount || 0) >= 1)) {
      setShowOnboarding(true);
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('forgeUser', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('forgeOnboarded', JSON.stringify(isOnboarded));
  }, [isOnboarded]);

  useEffect(() => {
    localStorage.setItem('forgeStreak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('forgeGoals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('forgeScrollCount', scrollCount.toString());
  }, [scrollCount]);

  useEffect(() => {
    localStorage.setItem('forgeReactionCount', reactionCount.toString());
  }, [reactionCount]);

  const completeOnboarding = (onboardingData) => {
    setStreak(parseInt(onboardingData.streak) || 0);
    setGoals(onboardingData.goals || []);
    setIsOnboarded(true);
    setShowOnboarding(false);
    setUser({
      id: Date.now().toString(),
      streak: parseInt(onboardingData.streak) || 0,
      goals: onboardingData.goals || [],
      joinedAt: new Date().toISOString(),
    });
  };

  const skipOnboarding = () => {
    setShowOnboarding(false);
    // Don't mark as onboarded, so we can show it again later
  };

  const incrementScrollCount = () => {
    const newCount = scrollCount + 1;
    setScrollCount(newCount);
    
    // Trigger onboarding after 3 scrolls if not onboarded
    if (!isOnboarded && newCount >= 3) {
      setShowOnboarding(true);
    }
  };

  const incrementReactionCount = () => {
    const newCount = reactionCount + 1;
    setReactionCount(newCount);
    
    // Trigger onboarding after 1 reaction if not onboarded
    if (!isOnboarded && newCount >= 1) {
      setShowOnboarding(true);
    }
  };

  const updateStreak = (newStreak) => {
    setStreak(newStreak);
    if (user) {
      setUser({ ...user, streak: newStreak });
    }
  };

  const resetStreak = (reason = '') => {
    setStreak(0);
    if (user) {
      setUser({ ...user, streak: 0, lastReset: new Date().toISOString(), resetReason: reason });
    }
  };

  const value = {
    user,
    isOnboarded,
    streak,
    goals,
    scrollCount,
    reactionCount,
    showOnboarding,
    completeOnboarding,
    skipOnboarding,
    incrementScrollCount,
    incrementReactionCount,
    updateStreak,
    resetStreak,
    setUser,
    setGoals,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;