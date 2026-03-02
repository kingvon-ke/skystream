import { Link } from "wouter";
import { ShieldCheck, Github } from "lucide-react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
          <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
            <div className="bg-primary/10 p-2 rounded-xl text-primary group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              Bera<span className="text-primary">Verification</span>
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="border-t border-border/50 bg-card mt-auto">
        <div className="container mx-auto px-4 py-8 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bera Numbers Verification. All rights reserved.</p>
          <div className="flex items-center gap-4 font-medium">
            <span>100% Free</span>
            <span className="w-1 h-1 rounded-full bg-primary/40"></span>
            <span>No Registration</span>
            <span className="w-1 h-1 rounded-full bg-primary/40"></span>
            <span>Live Feed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
