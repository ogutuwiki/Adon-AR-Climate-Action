
import { PageHeader } from "@/components/shared/PageHeader";
import { Gamepad2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type { GameLink } from "@/lib/types";

const mockGames: GameLink[] = [
  { 
    id: "1", 
    title: "EcoSnap Challenge", 
    platform: "Snapchat", 
    url: "https://www.snapchat.com", // Replace with actual game link
    thumbnailUrl: "https://placehold.co/400x225.png?text=♻️", 
    dataAiHint:"eco game",
    description: "Identify recyclable items in AR and learn fun facts!" 
  },
  { 
    id: "2", 
    title: "ClimateQuest TikTok", 
    platform: "TikTok", 
    url: "https://www.tiktok.com", // Replace with actual game link
    thumbnailUrl: "https://placehold.co/400x225.png?text=🌍", 
    dataAiHint:"earth game",
    description: "Complete mini-challenges about climate change effects." 
  },
  { 
    id: "3", 
    title: "GreenCity Builder", 
    platform: "Other", 
    url: "#", // Replace with actual game link
    thumbnailUrl: "https://placehold.co/400x225.png?text=🌳",
    dataAiHint:"city game",
    description: "Design a sustainable city in this interactive AR experience." 
  },
];

export default function GamesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AR Play & Learn Zone"
        description="Engage with fun Augmented Reality experiences from TikTok, Snapchat, and more. Learn about climate action while you play and earn bonus Carbon Credits!"
        icon={Gamepad2}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockGames.map((game) => (
          <Card key={game.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0 relative">
              <Image
                src={game.thumbnailUrl}
                alt={game.title}
                width={400}
                height={225}
                className="w-full h-48 object-cover"
                data-ai-hint={game.dataAiHint}
              />
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs font-semibold">
                {game.platform}
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle className="text-xl mb-2">{game.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mb-3 h-12">
                {game.description || "Engage in a fun AR experience to learn more about climate action."}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-4 bg-muted/30">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={game.url} target="_blank" rel="noopener noreferrer">
                  Play Now <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card className="mt-8 shadow-lg">
        <CardHeader>
            <CardTitle>How it Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
            <p>1. Click on a game to open it in its respective app (TikTok, Snapchat, etc.).</p>
            <p>2. Play the game and learn about sustainability.</p>
            <p>3. Some games may offer codes or instructions to claim bonus Carbon Credits back here on AdonAR!</p>
            <p className="text-sm pt-2">Note: AdonAR links to external AR experiences. We are not responsible for the content on third-party platforms.</p>
        </CardContent>
      </Card>
    </div>
  );
}
