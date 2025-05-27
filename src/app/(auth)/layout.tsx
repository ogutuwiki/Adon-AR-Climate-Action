
import { Logo } from '@/components/icons/Logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-xl md:p-8">
        {children}
      </div>
       <p className="mt-8 text-center text-sm text-muted-foreground">
        Empowering Africa&apos;s youth for climate action.
      </p>
    </div>
  );
}
