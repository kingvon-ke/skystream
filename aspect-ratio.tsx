import { Link } from "wouter";
import { Smartphone, SignalHigh } from "lucide-react";
import { Badge } from "./ui/badge";

interface NumberCardProps {
  id: number;
  country: string;
  number: string;
  isOnline: boolean;
  addedAt: string | Date | null;
}

export function NumberCard({ id, country, number, isOnline }: NumberCardProps) {
  return (
    <Link 
      href={`/number/${id}`}
      className="group block bg-card rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none transform translate-x-4 -translate-y-4">
        <Smartphone className="w-24 h-24 text-primary" />
      </div>

      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
            {country.substring(0, 2).toUpperCase()}
          </div>
          <h3 className="font-semibold text-muted-foreground tracking-wide uppercase text-sm">
            {country}
          </h3>
        </div>
        {isOnline ? (
          <Badge variant="success" className="animate-in fade-in zoom-in duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            Online
          </Badge>
        ) : (
          <Badge variant="warning">Offline</Badge>
        )}
      </div>
      
      <div className="space-y-1 relative z-10">
        <div className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
          <Smartphone className="w-4 h-4" /> Virtual Number
        </div>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
          {number}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <SignalHigh className="w-4 h-4 text-primary/60" /> Live Feed Active
        </div>
        <div className="text-sm font-semibold text-primary group-hover:underline">
          View SMS →
        </div>
      </div>
    </Link>
  );
}
