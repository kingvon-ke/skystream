import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ShieldAlert, Clock } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  content: string;
  receivedAt: string | Date;
}

interface MessageFeedProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageFeed({ messages, isLoading }: MessageFeedProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="h-5 w-32 bg-muted rounded-full"></div>
              <div className="h-4 w-20 bg-muted rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded-full"></div>
              <div className="h-4 w-2/3 bg-muted rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-muted/30 rounded-2xl border border-dashed border-border">
        <div className="mx-auto w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-sm mb-4">
          <MessageSquare className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No messages yet</h3>
        <p className="text-muted-foreground max-w-sm mx-auto text-balance">
          Messages sent to this number will appear here automatically within seconds. The feed is auto-refreshing.
        </p>
      </div>
    );
  }

  // Ensure latest messages are at the top
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
  );

  return (
    <div className="space-y-4">
      <AnimatePresence initial={false}>
        {sortedMessages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            layout
            className="bg-card rounded-2xl p-5 sm:p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/40 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-3">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                {msg.sender}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full w-fit">
                <Clock className="w-3.5 h-3.5" />
                {format(new Date(msg.receivedAt), "MMM d, yyyy • HH:mm:ss")}
              </div>
            </div>
            
            <p className="text-foreground/90 leading-relaxed break-words bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-border/40 font-mono text-sm sm:text-base">
              {msg.content}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
