"use client"

import React, { useState } from 'react';
import { Plus, X, Zap, Target, MessageSquare, Flame } from 'lucide-react';
import { useHaptic } from '@/hooks/useHaptic';

const QuickLog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logType, setLogType] = useState(null);
  const { lightTap, mediumTap, successTap } = useHaptic();

  const logTypes = [
    { id: 'urge', label: 'Urge Hit', icon: Zap, color: 'bg-gradient-to-br from-red-500 to-red-600', description: 'Log an urge spike', haptic: 'medium' },
    { id: 'win', label: 'Win', icon: Flame, color: 'bg-gradient-to-br from-orange-500 to-red-500', description: 'Share a victory', haptic: 'success' },
    { id: 'struggle', label: 'Struggle', icon: Target, color: 'bg-gradient-to-br from-blue-500 to-blue-600', description: 'Need support', haptic: 'light' },
    { id: 'insight', label: 'Insight', icon: MessageSquare, color: 'bg-gradient-to-br from-purple-500 to-purple-600', description: 'Quick thought', haptic: 'light' },
  ];

  const handleToggle = () => {
    lightTap();
    setIsOpen(!isOpen);
  };

  const handleLogTypeSelect = (type) => {
    // Trigger appropriate haptic feedback
    switch (type.haptic) {
      case 'success':
        successTap();
        break;
      case 'medium':
        mediumTap();
        break;
      default:
        lightTap();
    }

    setLogType(type);
    console.log(`Logging ${type.label}`);
    setIsOpen(false);
    setLogType(null);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full shadow-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-gradient-to-br from-red-500 to-red-600 text-white rotate-45 scale-110' 
            : 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:scale-110 hover:shadow-2xl'
        }`}
        style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>

      {/* Quick Log Options */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => {
              lightTap();
              setIsOpen(false);
            }}
          />
          
          {/* Options Menu */}
          <div className="fixed bottom-36 right-4 z-50 space-y-3">
            {logTypes.map((type, index) => (
              <div
                key={type.id}
                className="flex items-center gap-3 animate-in slide-in-from-right duration-300"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="text-xs text-foreground bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50 shadow-lg whitespace-nowrap">
                  {type.description}
                </div>
                <button
                  onClick={() => handleLogTypeSelect(type)}
                  className={`w-12 h-12 rounded-full ${type.color} text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-200`}
                >
                  <type.icon className="w-5 h-5 mx-auto" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default QuickLog;