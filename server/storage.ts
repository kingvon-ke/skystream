import { db } from "./db";
import {
  virtualNumbers,
  messages,
  type VirtualNumber,
  type Message,
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

// Create specific types for inserts
type InsertVirtualNumber = typeof virtualNumbers.$inferInsert;
type InsertMessage = typeof messages.$inferInsert;

export interface IStorage {
  getNumbers(): Promise<VirtualNumber[]>;
  getNumber(id: number): Promise<VirtualNumber | undefined>;
  getMessagesForNumber(numberId: number): Promise<Message[]>;
  createNumber(number: InsertVirtualNumber): Promise<VirtualNumber>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getNumbers(): Promise<VirtualNumber[]> {
    return await db.select().from(virtualNumbers);
  }

  async getNumber(id: number): Promise<VirtualNumber | undefined> {
    const [number] = await db.select().from(virtualNumbers).where(eq(virtualNumbers.id, id));
    return number;
  }

  async getMessagesForNumber(numberId: number): Promise<Message[]> {
    return await db.select().from(messages)
      .where(eq(messages.numberId, numberId))
      .orderBy(desc(messages.receivedAt))
      .limit(50);
  }

  async createNumber(number: InsertVirtualNumber): Promise<VirtualNumber> {
    const [newNumber] = await db.insert(virtualNumbers).values(number).returning();
    return newNumber;
  }

  async createMessage(msg: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(msg).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
