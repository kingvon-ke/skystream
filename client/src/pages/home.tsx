import { Layout } from "@/components/layout";
import { NumberCard } from "@/components/number-card";
import { useNumbers } from "@/hooks/use-numbers";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe, Shield, Zap, Lock } from "lucide-react";
import type { VirtualNumberResponse } from "@shared/routes";

export default function Home() {
  const { data: numbers, isLoading, error } = useNumbers();

  // Group numbers by country
  const groupedNumbers = numbers?.reduce((acc, curr) => {
    const country = curr.country || "Other";
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(curr);
    return acc;
  }, {} as Record<string, VirtualNumberResponse[]>) || {};

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 -translate-y-12 translate-x-1/3 opacity-20 pointer-events-none">
          <div className="w-96 h-96 bg-primary rounded-full blur-3xl mix-blend-multiply" />
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live OTP Verification
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-balance mx-auto">
            Receive SMS Online <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">For Free</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
            Protect your privacy with our reliable, disposable virtual numbers. Receive OTPs, verifications, and messages without using your personal phone number.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary"><Shield className="w-6 h-6"/></div>
              <div>
                <h3 className="font-semibold mb-1">Privacy First</h3>
                <p className="text-sm text-muted-foreground">Never reveal your real phone number again.</p>
              </div>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary"><Zap className="w-6 h-6"/></div>
              <div>
                <h3 className="font-semibold mb-1">Instant Receive</h3>
                <p className="text-sm text-muted-foreground">Messages appear in real-time, no refreshing needed.</p>
              </div>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary"><Lock className="w-6 h-6"/></div>
              <div>
                <h3 className="font-semibold mb-1">No Sign-up</h3>
                <p className="text-sm text-muted-foreground">Completely free to use without creating an account.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers List Section */}
      <section className="py-12 bg-muted/30 flex-1">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-10">
            <Globe className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">Available Numbers</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-2xl p-5 border border-border/50 h-48 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-48 mt-4" />
                  <Skeleton className="h-4 w-32 mt-4" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-destructive/10 text-destructive border border-destructive/20 p-6 rounded-xl text-center">
              <p className="font-semibold">Failed to load virtual numbers.</p>
              <p className="text-sm mt-2 opacity-80">Please check your connection and try again.</p>
            </div>
          ) : numbers?.length === 0 ? (
            <div className="text-center py-20">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold mb-2">No numbers available</h3>
              <p className="text-muted-foreground">Check back later for new virtual numbers.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedNumbers).map(([country, items]) => (
                <div key={country} className="animate-fade-in">
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2 border-b border-border/50 pb-2">
                    {country}
                    <span className="text-sm font-medium bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full ml-2">
                      {items.length} {items.length === 1 ? 'number' : 'numbers'}
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((num) => (
                      <NumberCard
                        key={num.id}
                        id={num.id}
                        country={num.country!}
                        number={num.number}
                        isOnline={num.isOnline ?? true}
                        addedAt={num.addedAt}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
