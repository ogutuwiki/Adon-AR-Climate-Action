
"use client";

import { useEffect, useState } from 'react';
import { generateChallenge, type GenerateChallengeOutput } from '@/ai/flows/dynamic-challenges';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

export function DynamicChallengeClient() {
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<GenerateChallengeOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChallenge() {
      if (!user) return; 
      try {
        // Mock input data for demonstration
        const mockInput = {
          userId: user.uid,
          pastActions: "Tracked food consumption, completed 'Waste Warrior' badge.",
          currentCreditBalance: 1250,
        };
        const result = await generateChallenge(mockInput);
        setChallenge(result);
      } catch (err) {
        setError("Failed to load a new challenge. Please try again later.");
        console.error("Error fetching dynamic challenge:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchChallenge();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-9 w-28" />
      </div>
    );
  }

  if (error) {
     return <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
    </Alert>;
  }

  if (!challenge) {
    return <p className="text-sm text-muted-foreground">No challenges available right now. Check back soon!</p>;
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">{challenge.challenge}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground flex items-center">
          <Zap className="h-3 w-3 mr-1 text-accent" />
          Reward: {challenge.rewardCredits} Credits
        </span>
        <Button size="sm" variant="outline">Accept Challenge</Button>
      </div>
    </div>
  );
}
