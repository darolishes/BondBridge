import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { generatePrompts, type AIProvider } from "./ai-service";
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

  // AI Prompts routes
  app.get("/api/ai-prompts", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const used = req.query.used ? req.query.used === 'true' : undefined;
      
      const prompts = await storage.getAiPrompts(req.user!.id, used, limit);
      res.json(prompts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch AI prompts" });
    }
  });
  
  app.get("/api/ai-prompts/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const id = parseInt(req.params.id);
      const prompt = await storage.getAiPrompt(id);
      
      if (!prompt) {
        return res.status(404).json({ error: "AI prompt not found" });
      }
      
      // Ensure the user can only access their own prompts
      if (prompt.userId !== req.user!.id) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      res.json(prompt);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch AI prompt" });
    }
  });
  
  app.post("/api/ai-prompts", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const { content, category, tag, difficulty, provider } = req.body;
      
      // Validate required fields
      if (!content || !category || !provider) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      const aiPrompt = await storage.createAiPrompt({
        content,
        category,
        tag: tag || null,
        difficulty: difficulty || null,
        userId: req.user!.id,
        provider,
        used: false,
        feedbackRating: null
      });
      
      res.status(201).json(aiPrompt);
    } catch (error) {
      res.status(500).json({ error: "Failed to create AI prompt" });
    }
  });
  
  app.patch("/api/ai-prompts/:id/feedback", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const id = parseInt(req.params.id);
      const { rating } = req.body;
      
      // Validate rating is between 1-5
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
      }
      
      // Get the prompt first to check ownership
      const prompt = await storage.getAiPrompt(id);
      if (!prompt) {
        return res.status(404).json({ error: "AI prompt not found" });
      }
      
      // Ensure the user can only rate their own prompts
      if (prompt.userId !== req.user!.id) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      const updatedPrompt = await storage.updateAiPromptFeedback(id, rating);
      res.json(updatedPrompt);
    } catch (error) {
      res.status(500).json({ error: "Failed to update AI prompt feedback" });
    }
  });
  
  app.patch("/api/ai-prompts/:id/mark-used", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const id = parseInt(req.params.id);
      
      // Get the prompt first to check ownership
      const prompt = await storage.getAiPrompt(id);
      if (!prompt) {
        return res.status(404).json({ error: "AI prompt not found" });
      }
      
      // Ensure the user can only mark their own prompts as used
      if (prompt.userId !== req.user!.id) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      const updatedPrompt = await storage.markAiPromptAsUsed(id);
      res.json(updatedPrompt);
    } catch (error) {
      res.status(500).json({ error: "Failed to mark AI prompt as used" });
    }
  });

  // Generate AI Prompts
  app.post("/api/generate-prompts", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const { 
        category = "General", 
        difficulty = "Medium", 
        count = 1 
      } = req.body;
      
      // Get user preferences
      const user = await storage.getUser(req.user!.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Get AI provider from user preferences
      const provider = user.preferences?.aiProvider || "openai";
      
      // Get past prompts to avoid duplication
      const pastPrompts = await storage.getAiPrompts(user.id, true, 10);
      const pastPromptContents = pastPrompts.map(prompt => prompt.content);
      
      // Generate new prompts
      const generatedPrompts = await generatePrompts({
        category,
        difficulty,
        count,
        provider: provider as AIProvider,
        userPreferences: user.preferences?.aiPersonalization,
        pastPrompts: pastPromptContents
      });
      
      // Save the generated prompts to the database
      const savedPrompts = await Promise.all(
        generatedPrompts.map(content => 
          storage.createAiPrompt({
            content,
            category,
            difficulty,
            tag: null,
            userId: user.id,
            provider,
            used: false,
            feedbackRating: null
          })
        )
      );
      
      res.status(201).json(savedPrompts);
    } catch (error) {
      console.error("Error generating prompts:", error);
      res.status(500).json({ error: "Failed to generate prompts" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
