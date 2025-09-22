"use client"

import React, { useState, useEffect } from 'react';
import { X, Flame, Users, Target, TrendingUp, ArrowRight, Check } from 'lucide-react';
import { useHaptic } from '@/hooks/useHaptic';

const OnboardingFlow = ({ onComplete, onSkip }) => {
    const [step, setStep] = useState(0);
    const [userStreak, setUserStreak] = useState('');
    const [userGoals, setUserGoals] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const { lightTap, successTap } = useHaptic();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const goals = [
        { id: 'energy', label: 'More Energy', icon: Flame, color: 'from-orange-500 to-red-500' },
        { id: 'focus', label: 'Better Focus', icon: Target, color: 'from-blue-500 to-cyan-500' },
        { id: 'confidence', label: 'Confidence', icon: Users, color: 'from-purple-500 to-pink-500' },
        { id: 'discipline', label: 'Self-Discipline', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    ];

    const handleGoalToggle = (goalId) => {
        lightTap();
        setUserGoals(prev =>
            prev.includes(goalId)
                ? prev.filter(id => id !== goalId)
                : [...prev, goalId]
        );
    };

    const handleNext = () => {
        lightTap();
        if (step < 2) {
            setStep(step + 1);
        } else {
            successTap();
            onComplete({ streak: userStreak, goals: userGoals });
        }
    };

    const handleSkip = () => {
        lightTap();
        onSkip();
    };

    const steps = [
        {
            title: "Welcome to The Forge",
            subtitle: "Where brothers build unbreakable discipline",
            content: (
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <Flame className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-muted-foreground">
                        Join 5.2K+ brothers on the path to mastery. No judgment, just real support.
                    </p>
                </div>
            )
        },
        {
            title: "What's your current streak?",
            subtitle: "Be honest - we're all starting somewhere",
            content: (
                <div className="space-y-4">
                    <div className="text-center">
                        <input
                            type="number"
                            value={userStreak}
                            onChange={(e) => setUserStreak(e.target.value)}
                            placeholder="0"
                            className="text-4xl font-bold text-center bg-transparent border-b-2 border-primary w-24 mx-auto focus:outline-none focus:border-orange-500 transition-colors"
                            min="0"
                            max="999"
                        />
                        <p className="text-sm text-muted-foreground mt-2">days retained</p>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        Day 0? Perfect. Every master was once a beginner.
                    </p>
                </div>
            )
        },
        {
            title: "What are you building?",
            subtitle: "Select your goals (choose any that resonate)",
            content: (
                <div className="grid grid-cols-2 gap-3">
                    {goals.map((goal) => {
                        const isSelected = userGoals.includes(goal.id);
                        const Icon = goal.icon;
                        return (
                            <button
                                key={goal.id}
                                onClick={() => handleGoalToggle(goal.id)}
                                className={`p-4 rounded-lg border-2 transition-all duration-200 ${isSelected
                                    ? `border-transparent bg-gradient-to-br ${goal.color} text-white`
                                    : 'border-border bg-card hover:border-primary/50'
                                    }`}
                            >
                                <Icon className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm font-medium">{goal.label}</span>
                                {isSelected && (
                                    <Check className="w-4 h-4 mx-auto mt-1" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )
        }
    ];

    return (
        <div className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className={`bg-card border border-border rounded-2xl p-6 w-full max-w-md transform transition-all duration-500 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                }`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-muted'
                                    }`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleSkip}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-foreground mb-2">
                        {steps[step].title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                        {steps[step].subtitle}
                    </p>
                    {steps[step].content}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    {step > 0 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="flex-1 py-3 px-4 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                        >
                            Back
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        disabled={step === 1 && !userStreak}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${step === 1 && !userStreak
                            ? 'bg-muted text-muted-foreground cursor-not-allowed'
                            : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 active:scale-95'
                            }`}
                    >
                        {step === 2 ? 'Start Journey' : 'Continue'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Skip Option */}
                {step === 0 && (
                    <div className="text-center mt-4">
                        <button
                            onClick={handleSkip}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Skip and explore first
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OnboardingFlow;