
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Join AdonAR</h1>
        <p className="text-muted-foreground">Start tracking your emissions and earning rewards today!</p>
      </div>
      <AuthForm mode="signup" />
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Button variant="link" asChild className="p-0 text-primary hover:text-accent">
          <Link href="/login">Log in</Link>
        </Button>
      </p>
    </div>
  );
}
