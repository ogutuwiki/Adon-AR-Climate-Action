
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
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, GoogleAuthProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  name: z.string().optional(), // Optional for login
});

type AuthFormValues = z.infer<typeof formSchema>;

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: AuthFormValues) {
    setIsLoading(true);
    try {
      if (mode === "signup") {
        if (!values.name) {
          form.setError("name", { type: "manual", message: "Name is required for signup." });
          setIsLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await updateProfile(userCredential.user, { displayName: values.name });
        toast({ title: "Account Created!", description: "Welcome to AdonAR." });
        router.push("/dashboard");
      } else {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({ title: "Logged In!", description: "Welcome back to AdonAR." });
        router.push("/dashboard");
      }
    } catch (error: any) {
      const errorCode = error.code;
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (errorCode === "auth/email-already-in-use") {
        errorMessage = "This email is already in use. Please try logging in.";
      } else if (errorCode === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (errorCode === "auth/operation-not-allowed") {
        errorMessage = "Email/password accounts are not enabled.";
      } else if (errorCode === "auth/weak-password") {
        errorMessage = "The password is too weak.";
      } else if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password" || errorCode === "auth/invalid-credential") {
        errorMessage = "Invalid email or password. Please try again.";
      }
      toast({ title: mode === "signup" ? "Signup Failed" : "Login Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({ title: "Signed In with Google!", description: "Welcome to AdonAR." });
      router.push("/dashboard");
    } catch (error: any) {
      const errorCode = error.code;
      let errorMessage = "Could not sign in with Google. Please try again.";
      if (errorCode === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in popup closed. Please try again.";
      } else if (errorCode === "auth/account-exists-with-different-credential") {
        errorMessage = "An account already exists with this email using a different sign-in method.";
      }
      toast({ title: "Google Sign-In Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {mode === "signup" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} disabled={isLoading || isGoogleLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} disabled={isLoading || isGoogleLoading}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} disabled={isLoading || isGoogleLoading}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading || isGoogleLoading}>
            {(isLoading && !isGoogleLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "signup" ? "Create Account" : "Log In"}
          </Button>
        </form>
      </Form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading || isGoogleLoading}>
        {isGoogleLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <GoogleIcon className="mr-2 h-5 w-5" />
        {mode === "signup" ? "Sign up with Google" : "Log in with Google"}
      </Button>
    </>
  );
}
