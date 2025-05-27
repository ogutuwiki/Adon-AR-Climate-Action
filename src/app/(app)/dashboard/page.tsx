
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, PlusCircle, Zap, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EmissionsChart } from "@/components/dashboard/EmissionsChart";
import { PersonalizedTipsClient } from "@/components/dashboard/PersonalizedTipsClient";
import { DynamicChallengeClient } from "@/components/dashboard/DynamicChallengeClient";

// Mock data
const carbonCredits = 1250;
const monthlyGoalProgress = 65; // percentage
const achievements = [
  { id: 1, name: "Eco Starter", description: "Tracked first emission", icon: "https://placehold.co/80x80.png?text=♻️", dataAiHint:"recycle badge" },
  { id: 2, name: "Waste Warrior", description: "Reduced waste by 10%", icon: "https://placehold.co/80x80.png?text=🗑️", dataAiHint:"trash badge" },
  { id: 3, name: "Green Commuter", description: "Used public transport 5 times", icon: "https://placehold.co/80x80.png?text=🚌", dataAiHint:"bus badge"},
  { id: 4, name: "Energy Saver", description: "Reduced electricity use", icon: "https://placehold.co/80x80.png?text=💡", dataAiHint:"lightbulb badge" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your climate action progress."
        icon={LayoutDashboard}
        action={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Track New Emission
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Credits</CardTitle>
            <Zap className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{carbonCredits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Goal Progress</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-5 w-5 text-accent">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{monthlyGoalProgress}%</div>
            <Progress value={monthlyGoalProgress} className="mt-2 h-3" />
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">Keep up the great work!</p>
          </CardFooter>
        </Card>
        
        <Card className="md:col-span-2 lg:col-span-1 shadow-lg">
           <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Achievements Unlocked</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Carousel opts={{ align: "start", loop: achievements.length > 3 }} className="w-full px-6 pb-4">
              <CarouselContent className="-ml-2">
                {achievements.map((achievement) => (
                  <CarouselItem key={achievement.id} className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/2">
                    <div className="flex flex-col items-center p-2 space-y-1 rounded-md border border-border/50 bg-background hover:bg-muted/50 transition-colors">
                       <Image src={achievement.icon} alt={achievement.name} width={48} height={48} className="rounded-full" data-ai-hint={achievement.dataAiHint} />
                      <p className="text-xs font-medium text-center truncate w-full">{achievement.name}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {achievements.length > 3 && <CarouselPrevious />}
              {achievements.length > 3 && <CarouselNext />}
            </Carousel>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 shadow-lg">
          <CardHeader>
            <CardTitle>Your Emissions Overview</CardTitle>
            <CardDescription>CO2e emissions by category this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <EmissionsChart />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center space-x-3 space-y-0 pb-2">
              <Lightbulb className="h-6 w-6 text-accent" />
              <CardTitle className="text-lg">Personalized Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <PersonalizedTipsClient />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center space-x-3 space-y-0 pb-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-accent"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <CardTitle className="text-lg">Today&apos;s Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <DynamicChallengeClient />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
