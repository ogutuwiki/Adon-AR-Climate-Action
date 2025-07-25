import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { FirebaseAuthProvider } from '@/components/auth/FirebaseAuthProvider';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AdonAR: Climate Action Platform',
  description: 'A youth-focused climate action platform for tracking emissions and earning carbon credits in Africa.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <FirebaseAuthProvider>
          {children}
          <Toaster />
        </FirebaseAuthProvider>
      </body>
    </html>
  );
}
