
"use client";
import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Calculator as CalculatorIcon } from "lucide-react";
import { EmissionForm } from "@/components/calculator/EmissionForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { EmissionData } from "@/lib/types";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { emissionCategoryDetails, type EmissionCategoryValue } from "@/lib/emission-data-utils";

export default function CalculatorPage() {
  const [emissionEntries, setEmissionEntries] = useState<EmissionData[]>([]);
  const { user } = useAuth(); 

  const handleLogEmission = (newEntry: EmissionData) => {
    setEmissionEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  const getCategoryLabel = (value: EmissionCategoryValue) => {
    return emissionCategoryDetails[value]?.label || value;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Emissions Calculator"
        description="Track your daily activities to understand and reduce your carbon footprint. Your entries help us provide personalized tips and challenges!"
        icon={CalculatorIcon}
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Log Your Emissions</CardTitle>
          <CardDescription>Select a category, then choose the item, quantity, and unit.</CardDescription>
        </CardHeader>
        <CardContent>
          <EmissionForm 
            onLogEmission={handleLogEmission}
            userId={user?.uid} 
          />
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Past Entries</CardTitle>
            <CardDescription>View your historically logged emissions data.</CardDescription>
        </CardHeader>
        <CardContent>
          {emissionEntries.length === 0 ? (
            <p className="text-muted-foreground">No emissions logged yet. Use the form above to add your first entry!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Item/Activity</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">CO₂e (kg)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emissionEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{format(new Date(entry.date), "MMM d, yyyy")}</TableCell>
                    <TableCell>{getCategoryLabel(entry.category)}</TableCell>
                    <TableCell>{entry.itemLabel}</TableCell>
                    <TableCell className="text-right">{entry.value}</TableCell>
                    <TableCell>{entry.unitLabel}</TableCell>
                    <TableCell className="text-right">{entry.co2e.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {emissionEntries.length > 5 && (
                <TableCaption>A list of your recent emission entries.</TableCaption>
              )}
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    