
import type { EmissionCategoryValue } from "./emission-data-utils";

export interface EmissionData {
  id?: string;
  userId: string;
  date: string; // ISO string
  category: EmissionCategoryValue;
  itemValue: string; 
  itemLabel: string;
  value: number; // quantity (e.g., kg of charcoal, km driven)
  unitValue: string; 
  unitLabel: string;
  co2e: number; // Calculated CO2 equivalent
  notes?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
  carbonCredits?: number;
  monthlyGoal?: number; // Target CO2e reduction
  // Add more fields as needed
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string; // URL to the badge icon
  unlockedAt?: string; // ISO string
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number; // Carbon credits needed
  type: 'mobile_money' | 'goods' | 'voucher';
  imageUrl?: string;
  dataAiHint?: string;
}

export interface GameLink {
  id: string;
  title: string;
  platform: 'TikTok' | 'Snapchat' | 'Other';
  url: string;
  thumbnailUrl: string;
  dataAiHint?: string;
  description?: string;
}

    