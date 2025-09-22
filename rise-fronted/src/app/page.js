
"use client";

import { useState, useEffect } from "react";
import Hero from "./HomePage/Components/Hero";
import Feed from "./HomePage/Components/Feed";
import Community from "./HomePage/Components/Community";
import PushSubscription from "@/components/PushSubscription/PushSubscription";
import { MobileNav } from "@/components/MobileNav/MobileNav";
import QuickLog from "@/components/QuickLog/QuickLog";
import OnboardingFlow from "@/components/Onboarding/OnboardingFlow";
import { useUser } from "@/contexts/UserContext";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState('feed');
  const { showOnboarding, completeOnboarding, skipOnboarding, incrementScrollCount } = useUser();

  // Track scrolling for onboarding trigger
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        incrementScrollCount();
      }, 1000); // Debounce scroll tracking
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [incrementScrollCount]);

  return (
    <main>
      <Hero activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Conditionally render the content based on the active tab */}
      {activeTab === 'feed' ? <Feed /> : <Community />}
      
      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow 
          onComplete={completeOnboarding}
          onSkip={skipOnboarding}
        />
      )}
      
      {/* <PushSubscription /> */}
      <MobileNav />
      <QuickLog />
      {/* <Footer /> */}
    </main>
  );
}
