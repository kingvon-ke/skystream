import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import axios from "axios";
import * as cheerio from "cheerio";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

async function scrapeNumbers() {
  try {
    // Using a reliable free SMS site as a source
    const response = await axios.get("https://receive-smss.com/", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const numbers: { country: string, number: string }[] = [];

    $(".number-boxes-item").each((i, el) => {
      const country = $(el).find(".country").text().trim();
      const number = $(el).find(".number").text().trim();
      if (country && number) {
        numbers.push({ country, number });
      }
    });

    for (const num of numbers.slice(0, 10)) {
      const existing = await storage.getNumbers();
      if (!existing.find(n => n.number === num.number)) {
        await storage.createNumber({ 
          country: num.country, 
          number: num.number, 
          isOnline: true 
        });
      }
    }
  } catch (err) {
    console.error("Error scraping numbers:", err);
  }
}

async function scrapeMessages(numberId: number, phoneNumber: string) {
  try {
    // Clean number for URL (remove +, spaces)
    const cleanNumber = phoneNumber.replace(/\+/g, "").replace(/\s/g, "");
    const url = `https://receive-smss.com/sms/${cleanNumber}/`;
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    
    const scrapedMessages: { sender: string, content: string }[] = [];
    
    // Select the table rows containing messages
    $("table.table-hover tbody tr").each((i, el) => {
      const sender = $(el).find("td").eq(0).text().trim();
      const content = $(el).find("td").eq(2).text().trim();
      if (sender && content) {
        scrapedMessages.push({ sender, content });
      }
    });

    const existingMessages = await storage.getMessagesForNumber(numberId);
    
    for (const msg of scrapedMessages.slice(0, 20)) {
      // Very basic duplicate check based on content and sender
      if (!existingMessages.find(m => m.content === msg.content && m.sender === msg.sender)) {
        await storage.createMessage({
          numberId,
          sender: msg.sender,
          content: msg.content
        });
      }
    }
  } catch (err) {
    console.error(`Error scraping messages for ${phoneNumber}:`, err);
  }
}

async function seedDatabase() {
  try {
    await scrapeNumbers();
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.numbers.list.path, async (req, res) => {
    // Periodically refresh list in background
    scrapeNumbers().catch(console.error);
    const numbers = await storage.getNumbers();
    res.json(numbers);
  });

  app.get(api.numbers.get.path, async (req, res) => {
    const numberId = Number(req.params.id);
    if (isNaN(numberId)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    
    const number = await storage.getNumber(numberId);
    if (!number) {
      return res.status(404).json({ message: 'Number not found' });
    }
    res.json(number);
  });

  app.get(api.numbers.messages.path, async (req, res) => {
    const numberId = Number(req.params.id);
    if (isNaN(numberId)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const number = await storage.getNumber(numberId);
    if (!number) {
      return res.status(404).json({ message: 'Number not found' });
    }
    
    // Trigger real-time scrape for this number
    await scrapeMessages(numberId, number.number);
    
    const messages = await storage.getMessagesForNumber(numberId);
    res.json(messages);
  });

  // Initial seed
  seedDatabase();

  return httpServer;
}
