
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, Flame, Apple, Trash2, Shirt, ShoppingCart, Leaf } from "lucide-react";
// import { db, auth } from "@/lib/firebase"; // Assuming you have these
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { useAuth } from "@/hooks/useAuth";

const emissionCategories = [
  { value: "cooking", label: "Cooking Fuel", icon: Flame },
  { value: "food", label: "Food Consumption", icon: Apple },
  { value: "waste", label: "Waste Generation", icon: Trash2 },
  { value: "clothing", label: "Clothing & Apparel", icon: Shirt },
  { value: "necessities", label: "Daily Necessities", icon: ShoppingCart },
] as const;

type EmissionCategoryValue = typeof emissionCategories[number]['value'];

const formSchema = z.object({
  category: z.enum(emissionCategories.map(c => c.value) as [EmissionCategoryValue, ...EmissionCategoryValue[]], {
    required_error: "Please select an emission category.",
  }),
  item: z.string().min(2, { message: "Item description must be at least 2 characters." }),
  quantity: z.coerce.number().min(0.1, { message: "Quantity must be greater than 0." }),
  unit: z.string().min(1, { message: "Unit is required (e.g., kg, liters, items)." }),
  notes: z.string().optional(),
});

type EmissionFormValues = z.infer<typeof formSchema>;

// Mock CO2e calculation factors (replace with actual factors or API call)
const co2eFactors: Record<EmissionCategoryValue, Record<string, number>> = {
  cooking: { "kg": 2.5, "liters": 1.8 }, // e.g., charcoal, kerosene
  food: { "kg": 5.0, "item": 1.2 }, // e.g., meat, imported fruit
  waste: { "kg": 0.5 }, // e.g., general waste
  clothing: { "item": 10.0 }, // e.g., new t-shirt
  necessities: { "item": 2.0 }, // e.g., plastic bottled product
};

export function EmissionForm() {
  // const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [calculatedCO2e, setCalculatedCO2e] = useState<number | null>(null);

  const form = useForm<EmissionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: undefined,
      item: "",
      quantity: 0,
      unit: "",
      notes: "",
    },
  });

  const watchCategory = form.watch("category");
  const watchQuantity = form.watch("quantity");
  const watchUnit = form.watch("unit");

  // Simulate real-time calculation
  useState(() => {
    if (watchCategory && watchQuantity > 0 && watchUnit) {
      const factorCategory = co2eFactors[watchCategory];
      const factor = factorCategory ? factorCategory[watchUnit.toLowerCase()] : undefined;
      if (factor) {
        setCalculatedCO2e(parseFloat((watchQuantity * factor).toFixed(2)));
      } else {
        setCalculatedCO2e(null); // Or show a message that unit is not recognized for this category
      }
    } else {
      setCalculatedCO2e(null);
    }
  });


  async function onSubmit(values: EmissionFormValues) {
    setIsLoading(true);
    // if (!user) {
    //   toast({ title: "Error", description: "You must be logged in to track emissions.", variant: "destructive" });
    //   setIsLoading(false);
    //   return;
    // }

    const co2e = calculatedCO2e; // Use the already calculated value

    if (co2e === null) {
        toast({ title: "Calculation Error", description: "Could not calculate CO2e. Check units.", variant: "destructive" });
        setIsLoading(false);
        return;
    }

    try {
      // // Firestore logic (example)
      // await addDoc(collection(db, "emissions"), {
      //   userId: user.uid,
      //   ...values,
      //   co2e,
      //   createdAt: serverTimestamp(),
      // });

      toast({
        title: "Emission Logged!",
        description: (
          <div className="flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-primary" />
            <span>Successfully tracked {values.item} ({co2e} kg CO₂e).</span>
          </div>
        ),
      });
      form.reset();
      setCalculatedCO2e(null);
    } catch (error) {
      console.error("Error logging emission:", error);
      toast({ title: "Error", description: "Could not log emission. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an emission category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {emissionCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center">
                          <cat.icon className="h-4 w-4 mr-2 text-muted-foreground" />
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="item"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item / Activity Description</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Charcoal, Beef, Plastic Bottles" {...field} />
                </FormControl>
                <FormDescription>
                  Specific item or activity you are tracking.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2.5" {...field} step="0.1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., kg, liters, items, km" {...field} />
                </FormControl>
                <FormDescription>
                  Unit of measurement for the quantity.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any relevant details, e.g., brand, origin, type of fuel..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {calculatedCO2e !== null && (
          <Alert variant="default" className="border-primary bg-primary/10">
             <Leaf className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary font-semibold">Estimated CO₂ Impact</AlertTitle>
            <AlertDescription className="text-primary/90">
              This activity contributes approximately <strong>{calculatedCO2e} kg CO₂e</strong>.
              <p className="text-xs mt-1">This is an estimate. Actual values may vary.</p>
            </AlertDescription>
          </Alert>
        )}
         {watchCategory && watchQuantity > 0 && watchUnit && calculatedCO2e === null && (
             <Alert variant="destructive">
                <AlertTitle>Calculation Unavailable</AlertTitle>
                <AlertDescription>
                    We couldn&apos;t calculate CO₂e for the unit &quot;{watchUnit}&quot; in the &quot;{emissionCategories.find(c => c.value === watchCategory)?.label}&quot; category. Please check your unit or try a common one (e.g., kg, item, liter).
                </AlertDescription>
            </Alert>
         )}


        <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging...
            </>
          ) : (
            "Log Emission"
          )}
        </Button>
      </form>
    </Form>
  );
}
