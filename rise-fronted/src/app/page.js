
"use client";

import { useState } from "react";
// import Hero from "./HomePage/Components/Hero";
// import Feed from "./HomePage/Components/Feed";
// import Community from "./HomePage/Components/Community";
import PushSubscription from "@/components/PushSubscription/PushSubscription";
import { MobileNav } from "@/components/MobileNav/MobileNav";
import Footer from "@/components/Footer/Footer";

import Header from "@/components/Header/Header";
export default function Home() {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <main>

      <Header />
      <MobileNav />
      
    </main>
  );
}
