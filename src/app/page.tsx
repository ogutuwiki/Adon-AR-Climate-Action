
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth'; // No longer needed for this temporary setup
// import { Skeleton } from '@/components/ui/skeleton'; // No longer needed

export default function HomePage() {
  // const { user, loading } = useAuth(); // Temporarily bypass auth check
  const router = useRouter();

  useEffect(() => {
    // if (!loading) {
    //   if (user) {
    //     router.replace('/dashboard');
    //   } else {
    //     router.replace('/login');
    //   }
    // }
    // For viewing purposes, redirect directly to dashboard
    router.replace('/dashboard');
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
       <div className="flex flex-col items-center space-y-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-primary animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        <p className="text-muted-foreground">Loading AdonAR...</p>
      </div>
    </div>
  );
}
