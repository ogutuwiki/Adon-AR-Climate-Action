
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Loader2, Leaf, ListTree } from "lucide-react";
import type { EmissionData } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { emissionCategoryDetails, type ItemOption, type UnitOption, type EmissionCategoryValue } from "@/lib/emission-data-utils";

const formSchema = z.object({
  category: z.custom<EmissionCategoryValue>(
    (val) => typeof val === 'string' && Object.keys(emissionCategoryDetails).includes(val),
    { required_error: "Please select an emission category." }
  ),
  item: z.string().min(1, { message: "Please select an item/activity." }),
  quantity: z.coerce.number().min(0.01, { message: "Quantity must be greater than 0." }),
  unit: z.string().min(1, { message: "Please select a unit." }),
  notes: z.string().optional(),
});

type EmissionFormValues = z.infer<typeof formSchema>;

interface EmissionFormProps {
  onLogEmission: (data: EmissionData) => void;
  userId?: string | null;
}

export function EmissionForm({ onLogEmission, userId }: EmissionFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [calculatedCO2e, setCalculatedCO2e] = useState<number | null>(null);

  const [availableItems, setAvailableItems] = useState<ItemOption[]>([]);
  const [availableUnits, setAvailableUnits] = useState<UnitOption[]>([]);

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
  const watchItem = form.watch("item");


  useEffect(() => {
    if (watchCategory) {
      const categoryData = emissionCategoryDetails[watchCategory];
      setAvailableItems(categoryData.items);
      setAvailableUnits(categoryData.units);
      // Reset item and unit only if the available options don't include the current value
      if (watchItem && !categoryData.items.find(i => i.value === watchItem)) {
        form.resetField("item", { defaultValue: "" });
      }
      if (watchUnit && !categoryData.units.find(u => u.value === watchUnit)) {
         form.resetField("unit", { defaultValue: "" });
      }
      setCalculatedCO2e(null);
    } else {
      setAvailableItems([]);
      setAvailableUnits([]);
      form.resetField("item", { defaultValue: "" });
      form.resetField("unit", { defaultValue: "" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchCategory, form]); // watchItem and watchUnit removed to prevent reset loops on initial load with values

 useEffect(() => {
    if (watchCategory && watchQuantity > 0 && watchUnit) {
      const categoryData = emissionCategoryDetails[watchCategory];
      const selectedUnitInfo = categoryData.units.find(u => u.value === watchUnit);
      
      if (selectedUnitInfo) {
        setCalculatedCO2e(parseFloat((watchQuantity * selectedUnitInfo.co2eFactor).toFixed(2)));
      } else {
        setCalculatedCO2e(null);
      }
    } else {
      setCalculatedCO2e(null);
    }
  }, [watchCategory, watchQuantity, watchUnit]);


  async function onSubmit(values: EmissionFormValues) {
    setIsLoading(true);
    
    const co2e = calculatedCO2e;

    if (co2e === null) {
        toast({ title: "Calculation Error", description: "Could not calculate CO2e. Ensure quantity is entered and unit is compatible.", variant: "destructive" });
        setIsLoading(false);
        return;
    }

    const categoryData = emissionCategoryDetails[values.category];
    const itemLabel = categoryData.items.find(i => i.value === values.item)?.label || values.item;
    const unitLabel = categoryData.units.find(u => u.value === values.unit)?.label || values.unit;

    const newEmissionEntry: EmissionData = {
      id: Date.now().toString(), 
      userId: userId || "mock-user-id", 
      date: new Date().toISOString(),
      category: values.category,
      itemValue: values.item,
      itemLabel: itemLabel,
      value: values.quantity,
      unitValue: values.unit,
      unitLabel: unitLabel,
      co2e: co2e,
      notes: values.notes,
    };

    try {
      onLogEmission(newEmissionEntry);
      toast({
        title: "Emission Logged!",
        description: (
          <div className="flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-primary" />
            <span>Successfully tracked {itemLabel} ({co2e} kg CO₂e).</span>
          </div>
        ),
      });
      form.reset();
      setAvailableItems([]);
      setAvailableUnits([]);
      setCalculatedCO2e(null);
    } catch (error) {
      console.error("Error logging emission:", error);
      toast({ title: "Error", description: "Could not log emission. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }
  
  const categoryOptions = Object.entries(emissionCategoryDetails).map(([value, { label, icon: Icon }]) => ({
    value: value as EmissionCategoryValue,
    label,
    Icon,
  }));

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
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an emission category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryOptions.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center">
                          <cat.Icon className="h-4 w-4 mr-2 text-muted-foreground" />
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
                <FormLabel>Item / Activity</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value} disabled={!watchCategory || availableItems.length === 0}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an item/activity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableItems.map((itemOpt) => (
                      <SelectItem key={itemOpt.value} value={itemOpt.value}>
                        {itemOpt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  <Input type="number" placeholder="e.g., 2.5" {...field} step="any" />
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
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value} disabled={!watchCategory || availableUnits.length === 0}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableUnits.map((unitOpt) => (
                      <SelectItem key={unitOpt.value} value={unitOpt.value}>
                        {unitOpt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  placeholder="Add any relevant details..."
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
                <AlertTitle>Calculation Issue</AlertTitle>
                <AlertDescription>
                    Could not calculate CO₂e. Please ensure the selected unit is appropriate for the category and quantity.
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

    