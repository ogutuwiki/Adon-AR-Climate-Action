
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back!</h1>
        <p className="text-muted-foreground">Log in to continue your climate action journey.</p>
      </div>
      <AuthForm mode="login" />
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Button variant="link" asChild className="p-0 text-primary hover:text-accent">
          <Link href="/signup">Sign up</Link>
        </Button>
      </p>
    </div>
  );
}
