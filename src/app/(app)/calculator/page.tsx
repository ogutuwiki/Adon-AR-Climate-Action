
import { PageHeader } from "@/components/shared/PageHeader";
import { Calculator as CalculatorIcon } from "lucide-react";
import { EmissionForm } from "@/components/calculator/EmissionForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CalculatorPage() {
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
          <CardDescription>Fill in the details for any relevant categories. Only enter what you know.</CardDescription>
        </CardHeader>
        <CardContent>
          <EmissionForm />
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Past Entries (Coming Soon)</CardTitle>
            <CardDescription>View and manage your historical emissions data.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This section will display a table or list of your previously logged emissions. You'll be able to edit or delete entries here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
