
"use client";

import { useEffect, useState } from 'react';
import { getPersonalizedTips, type PersonalizedTipsOutput } from '@/ai/flows/personalized-tips';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ListChecks } from 'lucide-react';

export function PersonalizedTipsClient() {
  const [tips, setTips] = useState<PersonalizedTipsOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTips() {
      try {
        // Mock input data for demonstration
        const mockInput = {
          cookingFuelEmissions: Math.random() * 50,
          foodConsumptionEmissions: Math.random() * 100,
          wasteEmissions: Math.random() * 30,
          clothingEmissions: Math.random() * 20,
          dailyNecessitiesEmissions: Math.random() * 40,
        };
        const result = await getPersonalizedTips(mockInput);
        setTips(result);
      } catch (err) {
        setError("Failed to load personalized tips. Please try again later.");
        console.error("Error fetching personalized tips:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTips();
  }, []);

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
    </Alert>;
  }

  if (!tips || tips.tips.length === 0) {
    return <p className="text-sm text-muted-foreground">No tips available at the moment. Keep tracking your emissions!</p>;
  }

  return (
    <ul className="space-y-2 text-sm">
      {tips.tips.map((tip, index) => (
        <li key={index} className="flex items-start">
          <ListChecks className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary" />
          <span>{tip}</span>
        </li>
      ))}
    </ul>
  );
}
