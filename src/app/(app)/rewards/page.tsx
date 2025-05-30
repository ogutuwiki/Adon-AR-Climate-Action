
import { PageHeader } from "@/components/shared/PageHeader";
import { Gift, Award, ShieldCheck, Users, ShoppingBag, Smartphone, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Reward } from "@/lib/types";

const mockUserCredits = 1250;
const mockVerificationStatus = "Verified"; // Could be "Pending", "Requires Action"

const mockRewards: Reward[] = [
  { id: "1", name: "Mobile Airtime (KES 100)", description: "Get KES 100 mobile airtime for any network.", cost: 500, type: "mobile_money", imageUrl: "https://placehold.co/300x200.png?text=📱", dataAiHint:"mobile airtime" },
  { id: "2", name: "Eco-Friendly Soap Bar", description: "Locally sourced, handmade eco-friendly soap.", cost: 750, type: "goods", imageUrl: "https://placehold.co/300x200.png?text=🧼", dataAiHint:"soap bar" },
  { id: "3", name: "Tree Sapling Donation", description: "Donate a tree sapling to a local reforestation project.", cost: 300, type: "voucher", imageUrl: "https://placehold.co/300x200.png?text=🌳", dataAiHint:"tree sapling"},
  { id: "4", name: "Data Bundle (1GB)", description: "1GB data bundle for staying connected.", cost: 1000, type: "mobile_money", imageUrl: "https://placehold.co/300x200.png?text=📶", dataAiHint:"data bundle" },
];

const mockLeaderboard = [
    { id: "1", name: "EcoWarriorJane", credits: 5820, avatar: "https://placehold.co/40x40.png?text=JW", dataAiHint:"avatar person" },
    { id: "2", name: "GreenThumbKofi", credits: 5500, avatar: "https://placehold.co/40x40.png?text=GK", dataAiHint:"avatar person" },
    { id: "3", name: "ClimateHeroAisha", credits: 5150, avatar: "https://placehold.co/40x40.png?text=AH", dataAiHint:"avatar person" },
    { id: "4", name: "You", credits: mockUserCredits, avatar: "https://placehold.co/40x40.png?text=ME", dataAiHint:"avatar person", isCurrentUser: true },
    { id: "5", name: "SustainableSam", credits: 4800, avatar: "https://placehold.co/40x40.png?text=SS", dataAiHint:"avatar person" },
];


export default function RewardsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Rewards Hub"
        description="Redeem your hard-earned Carbon Credits for exciting rewards and track your verification status."
        icon={Gift}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Your Credits</CardTitle>
            <Award className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-primary">{mockUserCredits.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Available Carbon Credits</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Verification Status</CardTitle>
            <ShieldCheck className={`h-6 w-6 ${mockVerificationStatus === "Verified" ? "text-primary" : "text-muted-foreground"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${mockVerificationStatus === "Verified" ? "text-primary" : "text-muted-foreground"}`}>
              {mockVerificationStatus}
            </div>
            <p className="text-sm text-muted-foreground">Monthly emissions data verification.</p>
          </CardContent>
          {mockVerificationStatus !== "Verified" && (
            <CardFooter>
                <Button variant="outline" size="sm">Learn More</Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><ShoppingBag className="mr-2 h-6 w-6 text-primary" />Redeem Your Credits</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockRewards.map((reward) => (
            <Card key={reward.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                {reward.imageUrl && (
                  <Image
                    src={reward.imageUrl}
                    alt={reward.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-t-lg"
                    data-ai-hint={reward.dataAiHint}
                  />
                )}
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="text-lg mb-1">{reward.name}</CardTitle>
                <CardDescription className="text-xs mb-2 h-10">{reward.description}</CardDescription>
                 <div className="flex items-center text-primary font-semibold text-sm">
                    <Award className="h-4 w-4 mr-1"/> {reward.cost} Credits
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full" disabled={mockUserCredits < reward.cost}>
                    {mockUserCredits < reward.cost ? "Not Enough Credits" : "Redeem"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">Understanding Your Carbon Credits</CardTitle>
          </div>
          <CardDescription>Learn how your actions on AdonAR contribute to real-world climate solutions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            The Carbon Credits you earn on AdonAR represent tangible contributions to environmental projects.
            We partner with organizations that run verified carbon offset initiatives, such as reforestation,
            renewable energy development, and community-based conservation efforts.
          </p>
          <p>
            These projects are audited by independent, internationally recognized standards to ensure they
            deliver real, measurable, and additional emission reductions.
          </p>
          <p>
            Your engagement on AdonAR—tracking emissions, completing challenges, and learning—helps us
            support and fund these vital projects. When credits are used, they are "retired," meaning
            they cannot be used again, ensuring a permanent positive impact.
          </p>
          <p>
            Together, we're making a difference!
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><Users className="mr-2 h-6 w-6 text-primary" />Community Leaderboard (Optional)</h2>
        <Card className="shadow-lg">
            <CardContent className="pt-6">
                <ul className="space-y-4">
                    {mockLeaderboard.slice(0,5).map((user, index) => (
                        <li key={user.id} className={`flex items-center justify-between p-3 rounded-md ${user.isCurrentUser ? 'bg-primary/10 border border-primary' : 'bg-muted/50'}`}>
                            <div className="flex items-center">
                                <span className={`font-semibold w-6 text-center mr-3 ${index < 3 ? 'text-primary' : 'text-muted-foreground'}`}>{index + 1}</span>
                                <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full mr-3" data-ai-hint={user.dataAiHint} />
                                <span className={`font-medium ${user.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>{user.name}</span>
                            </div>
                            <span className={`font-semibold ${index < 3 || user.isCurrentUser ? 'text-primary' : 'text-muted-foreground'}`}>{user.credits.toLocaleString()} CC</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
             <CardFooter className="justify-center">
                <Button variant="link">View Full Leaderboard</Button>
            </CardFooter>
        </Card>
      </div>

    </div>
  );
}
