import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Layout } from "@/components/layout";
import { useNumber, useNumberMessages } from "@/hooks/use-numbers";
import { MessageFeed } from "@/components/message-feed";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Check, ArrowLeft, RefreshCw, Smartphone } from "lucide-react";

export default function NumberDetails() {
  const { id } = useParams<{ id: string }>();
  const numberId = parseInt(id, 10);
  
  const { data: virtualNumber, isLoading: isLoadingNumber, error: numberError } = useNumber(numberId);
  const { data: messages = [], isLoading: isLoadingMessages, isFetching } = useNumberMessages(numberId);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!virtualNumber) return;
    navigator.clipboard.writeText(virtualNumber.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If validation fails or number not found
  if (!isLoadingNumber && !virtualNumber) {
    return (
      <Layout>
        <div className="container mx-auto px-4 max-w-4xl py-20 text-center">
          <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Number Not Found</h1>
          <p className="text-muted-foreground mb-8">The virtual number you are looking for does not exist or has been removed.</p>
          <Link href="/">
            <Button size="lg">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Numbers
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Dynamic Background */}
      <div className="absolute top-0 inset-x-0 h-[40vh] bg-gradient-to-b from-primary/10 to-background pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-4xl py-8 lg:py-12">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 
          Back to all numbers
        </Link>

        {/* Number Header Card */}
        <div className="bg-card rounded-3xl p-6 md:p-10 border border-border/60 shadow-xl shadow-black/5 mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
            <Smartphone className="w-64 h-64 text-primary" />
          </div>

          {isLoadingNumber ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-16 w-64 md:w-96" />
              <Skeleton className="h-10 w-40" />
            </div>
          ) : virtualNumber ? (
            <div className="relative z-10">
              <div className="flex flex-wrap gap-3 items-center mb-6">
                <Badge variant="outline" className="bg-background px-3 py-1 text-sm shadow-sm">
                  {virtualNumber.country}
                </Badge>
                {virtualNumber.isOnline ? (
                  <Badge variant="success" className="px-3 py-1 text-sm shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                    Receiving Messages Live
                  </Badge>
                ) : (
                  <Badge variant="warning" className="px-3 py-1 text-sm shadow-sm">
                    Offline
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-8">
                {virtualNumber.number}
              </h1>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={copyToClipboard}
                  className="font-bold text-base px-8 shadow-lg shadow-primary/25 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  {copied ? (
                    <><Check className="w-5 h-5 mr-2" /> Copied!</>
                  ) : (
                    <><Copy className="w-5 h-5 mr-2" /> Copy Number</>
                  )}
                </Button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Messages Feed Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Live SMS Feed</h2>
              <p className="text-muted-foreground text-sm mt-1">Messages auto-refresh every 3 seconds</p>
            </div>
            
            <div className={`text-primary flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 transition-transform duration-500 ${isFetching ? 'rotate-180 opacity-100' : 'opacity-30'}`}>
              <RefreshCw className="w-5 h-5" />
            </div>
          </div>

          <MessageFeed messages={messages} isLoading={isLoadingMessages} />
        </div>

      </div>
    </Layout>
  );
}
