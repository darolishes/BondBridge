import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Card themes routes
  app.get("/api/card-themes", async (req, res) => {
    try {
      const themes = await storage.getCardThemes();
      res.json(themes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch card themes" });
    }
  });

  app.get("/api/card-themes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const theme = await storage.getCardTheme(id);
      
      if (!theme) {
        return res.status(404).json({ error: "Theme not found" });
      }
      
      res.json(theme);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch theme" });
    }
  });

  // Cards routes
  app.get("/api/cards", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const category = req.query.category as string | undefined;
      const themeId = req.query.themeId ? parseInt(req.query.themeId as string) : undefined;
      
      const cards = await storage.getCards(limit, category, themeId);
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cards" });
    }
  });

  // Related cards endpoint - use a different URL pattern to avoid conflicts
  app.get("/api/related-cards/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      
      const relatedCards = await storage.getRelatedCards(id, limit);
      res.header("Content-Type", "application/json");
      res.json(relatedCards);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch related cards" });
    }
  });
  
  // Single card by ID
  app.get("/api/cards/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const card = await storage.getCard(id);
      
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }
      
      res.json(card);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch card" });
    }
  });

  // Saved cards routes
  app.get("/api/saved-cards", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const savedCards = await storage.getSavedCards(req.user!.id);
      res.json(savedCards);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch saved cards" });
    }
  });

  app.post("/api/saved-cards", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const { cardId } = req.body;
      
      // Validate card exists
      const card = await storage.getCard(cardId);
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }
      
      const savedCard = await storage.saveCard({
        userId: req.user!.id,
        cardId
      });
      
      res.status(201).json(savedCard);
    } catch (error) {
      res.status(500).json({ error: "Failed to save card" });
    }
  });

  app.delete("/api/saved-cards/:cardId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const cardId = parseInt(req.params.cardId);
      const success = await storage.removeSavedCard(req.user!.id, cardId);
      
      if (!success) {
        return res.status(404).json({ error: "Saved card not found" });
      }
      
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove saved card" });
    }
  });

  // User preferences
  app.patch("/api/user/preferences", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const { preferences } = req.body;
      const updatedUser = await storage.updateUserPreferences(req.user!.id, preferences);
      
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update preferences" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
