import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const virtualNumbers = pgTable("virtual_numbers", {
  id: serial("id").primaryKey(),
  country: text("country").notNull(),
  number: text("number").notNull(),
  isOnline: boolean("is_online").default(true).notNull(),
  addedAt: timestamp("added_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  numberId: serial("number_id").references(() => virtualNumbers.id),
  sender: text("sender").notNull(),
  content: text("content").notNull(),
  receivedAt: timestamp("received_at").defaultNow().notNull(),
});

export const insertVirtualNumberSchema = createInsertSchema(virtualNumbers).omit({ id: true, addedAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, receivedAt: true });

export type VirtualNumber = typeof virtualNumbers.$inferSelect;
export type Message = typeof messages.$inferSelect;
