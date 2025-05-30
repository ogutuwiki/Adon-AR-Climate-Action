
import type { LucideIcon } from 'lucide-react';
import { Flame, Apple, Trash2, Shirt, ShoppingCart, Car } from 'lucide-react';

export type EmissionCategoryValue = 'cooking' | 'food' | 'waste' | 'clothing' | 'necessities' | 'transport';

export interface UnitOption {
  value: string;
  label: string;
  co2eFactor: number;
}

export interface ItemOption {
  value: string;
  label: string;
}

export interface EmissionCategoryDefinition {
  label: string;
  icon: LucideIcon;
  items: ItemOption[];
  units: UnitOption[];
}

export const emissionCategoryDetails: Record<EmissionCategoryValue, EmissionCategoryDefinition> = {
  cooking: {
    label: "Cooking Fuel",
    icon: Flame,
    items: [
      { value: "charcoal", label: "Charcoal" },
      { value: "firewood", label: "Firewood" },
      { value: "lpg", label: "LPG (Gas Cylinder)" },
      { value: "kerosene", label: "Kerosene" },
      { value: "biogas", label: "Biogas" },
      { value: "electricity_cooking", label: "Electricity (Stove)" },
      { value: "other_cooking_fuel", label: "Other Cooking Fuel" },
    ],
    units: [
      { value: "kg_fuel", label: "kg (Charcoal, Firewood)", co2eFactor: 2.75 },
      { value: "liters_kerosene", label: "Liters (Kerosene)", co2eFactor: 2.52 },
      { value: "cylinder_6kg_lpg", label: "6kg Cylinder (LPG)", co2eFactor: 18 },
      { value: "cylinder_13kg_lpg", label: "13kg Cylinder (LPG)", co2eFactor: 39 },
      { value: "kwh_cooking", label: "kWh (Electricity for cooking)", co2eFactor: 0.5 },
      { value: "m3_biogas", label: "m³ (Biogas)", co2eFactor: 0.1 },
    ],
  },
  food: {
    label: "Food Consumption",
    icon: Apple,
    items: [
      { value: "beef", label: "Beef" },
      { value: "lamb_mutton", label: "Lamb/Mutton" },
      { value: "pork", label: "Pork" },
      { value: "poultry", label: "Poultry (Chicken, Turkey)" },
      { value: "fish_farmed", label: "Fish (Farmed)" },
      { value: "fish_wild", label: "Fish (Wild Caught)" },
      { value: "eggs", label: "Eggs" },
      { value: "dairy_milk", label: "Milk (Dairy)" },
      { value: "dairy_cheese", label: "Cheese" },
      { value: "rice", label: "Rice" },
      { value: "wheat_bread", label: "Wheat/Bread" },
      { value: "maize_corn", label: "Maize/Corn" },
      { value: "vegetables_local", label: "Vegetables (Local)" },
      { value: "fruits_local", label: "Fruits (Local)" },
      { value: "imported_food", label: "Imported Food Item" },
      { value: "processed_snack", label: "Processed Snack/Meal" },
    ],
    units: [
      { value: "kg_food", label: "kg", co2eFactor: 5 }, // Highly variable, placeholder average
      { value: "g_food", label: "grams (g)", co2eFactor: 0.005 },
      { value: "liters_milk", label: "Liters (Milk)", co2eFactor: 1.4 },
      { value: "dozen_eggs", label: "Dozen (Eggs)", co2eFactor: 2.5 },
      { value: "serving_food", label: "Serving / Portion", co2eFactor: 0.8 },
      { value: "item_food_generic", label: "Single Item (Generic)", co2eFactor: 0.3 },
    ],
  },
  waste: {
    label: "Waste Generation",
    icon: Trash2,
    items: [
      { value: "general_waste_landfill", label: "General Waste (to Landfill)" },
      { value: "organic_waste_composted", label: "Organic Waste (Composted)" },
      { value: "plastic_recycled", label: "Plastic Waste (Recycled)" },
      { value: "plastic_landfill", label: "Plastic Waste (to Landfill)" },
      { value: "paper_recycled", label: "Paper Waste (Recycled)" },
      { value: "paper_landfill", label: "Paper Waste (to Landfill)" },
      { value: "glass_recycled", label: "Glass Waste (Recycled)" },
      { value: "metal_recycled", label: "Metal Waste (Recycled)" },
      { value: "ewaste", label: "E-waste (e.g., phone, charger)" },
    ],
    units: [
      { value: "kg_waste", label: "kg", co2eFactor: 0.58 }, // Avg for mixed municipal waste to landfill
      { value: "bin_small_waste", label: "Small Bin Full (approx 5kg)", co2eFactor: 2.9 }, // 5 * 0.58
      { value: "bin_large_waste", label: "Large Bin Full (approx 20kg)", co2eFactor: 11.6 }, // 20 * 0.58
      { value: "item_ewaste", label: "Single E-waste Item", co2eFactor: 5 }, // Highly variable
    ],
  },
  clothing: {
    label: "Clothing & Apparel",
    icon: Shirt,
    items: [
      { value: "tshirt_cotton_new", label: "T-shirt, Cotton (New)" },
      { value: "jeans_denim_new", label: "Jeans, Denim (New)" },
      { value: "dress_synthetic_new", label: "Dress, Synthetic (New)" },
      { value: "shoes_leather_new", label: "Shoes, Leather (New)" },
      { value: "shoes_synthetic_new", label: "Shoes, Synthetic (New)" },
      { value: "clothing_generic_new", label: "Generic Clothing Item (New)" },
      { value: "second_hand_clothing", label: "Second-hand Clothing Item" },
    ],
    units: [{ value: "item_clothing", label: "Single Item", co2eFactor: 6.5 }], // Average new clothing item
  },
  necessities: {
    label: "Daily Necessities",
    icon: ShoppingCart,
    items: [
      { value: "toiletries_generic", label: "Toiletries (e.g., soap, toothpaste)" },
      { value: "cleaning_products_generic", label: "Cleaning Products" },
      { value: "stationery_generic", label: "Stationery (e.g., notebook, pens)" },
      { value: "electronics_small_generic", label: "Small Electronics (e.g., charger, cable)" },
      { value: "disposable_product", label: "Single-use Disposable Product" },
    ],
    units: [{ value: "item_necessity", label: "Single Item", co2eFactor: 1.2 }], // Average for small consumer goods
  },
  transport: {
    label: "Transport",
    icon: Car,
    items: [
      { value: "car_petrol_solo", label: "Car (Petrol, solo)" },
      { value: "car_diesel_solo", label: "Car (Diesel, solo)" },
      { value: "car_electric_solo", label: "Car (Electric, solo)" },
      { value: "car_shared", label: "Car (Shared/Ride-hail)" },
      { value: "motorcycle_boda", label: "Motorcycle/Boda-boda" },
      { value: "bus_matatu_public", label: "Bus/Matatu (Public)" },
      { value: "train_public", label: "Train (Public)" },
      { value: "bicycle_transport", label: "Bicycle" },
      { value: "walking_transport", label: "Walking" },
      { value: "flight_domestic", label: "Flight (Domestic)" },
      { value: "flight_short_intl", label: "Flight (Short Haul International)" },
      { value: "flight_long_intl", label: "Flight (Long Haul International)" },
    ],
    units: [
      { value: "km_transport", label: "km", co2eFactor: 0.17 }, // Avg petrol car per km
      { value: "miles_transport", label: "Miles", co2eFactor: 0.27 }, // km * 1.609 * factor
      { value: "trip_urban", label: "Urban Trip (Typical)", co2eFactor: 1.5 }, // Approx. for a boda or short car ride
      { value: "trip_intercity", label: "Intercity Trip (Typical)", co2eFactor: 25 }, // Highly variable
      { value: "passenger_km_flight", label: "Passenger-km (Flight)", co2eFactor: 0.15 }, // Varies based on distance/class
    ],
  },
};

    
