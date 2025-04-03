import { 
  users, cards, savedCards, cardThemes, aiPrompts,
  type User, type InsertUser, 
  type Card, type InsertCard, 
  type SavedCard, type InsertSavedCard, 
  type CardTheme, type InsertCardTheme,
  type AiPrompt, type InsertAiPrompt 
} from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";
import { eq, and, or, ne, desc } from "drizzle-orm";
import { db } from "./db";
import { Pool } from '@neondatabase/serverless';

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPreferences(id: number, preferences: any): Promise<User | undefined>;
  
  // Theme methods
  getCardTheme(id: number): Promise<CardTheme | undefined>;
  getCardThemes(): Promise<CardTheme[]>;
  createCardTheme(theme: InsertCardTheme): Promise<CardTheme>;
  
  // Card methods
  getCard(id: number): Promise<Card | undefined>;
  getCards(limit?: number, category?: string, themeId?: number): Promise<Card[]>;
  getRelatedCards(cardId: number, limit?: number): Promise<Card[]>;
  createCard(card: InsertCard): Promise<Card>;

  // Saved card methods
  getSavedCards(userId: number): Promise<Card[]>;
  saveCard(savedCard: InsertSavedCard): Promise<SavedCard>;
  removeSavedCard(userId: number, cardId: number): Promise<boolean>;
  
  // AI Prompt methods
  getAiPrompts(userId: number, used?: boolean, limit?: number): Promise<AiPrompt[]>;
  getAiPrompt(id: number): Promise<AiPrompt | undefined>;
  createAiPrompt(aiPrompt: InsertAiPrompt): Promise<AiPrompt>;
  updateAiPromptFeedback(id: number, rating: number): Promise<AiPrompt | undefined>;
  markAiPromptAsUsed(id: number): Promise<AiPrompt | undefined>;
  
  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cards: Map<number, Card>;
  private savedCards: Map<number, SavedCard>;
  private cardThemes: Map<number, CardTheme>;
  private aiPrompts: Map<number, AiPrompt>;
  sessionStore: session.Store;
  currentUserId: number;
  currentCardId: number;
  currentSavedCardId: number;
  currentCardThemeId: number;
  currentAiPromptId: number;

  constructor() {
    this.users = new Map();
    this.cards = new Map();
    this.savedCards = new Map();
    this.cardThemes = new Map();
    this.aiPrompts = new Map();
    this.currentUserId = 1;
    this.currentCardId = 1;
    this.currentSavedCardId = 1;
    this.currentCardThemeId = 1;
    this.currentAiPromptId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Add sample themes and cards
    this.seedThemes();
    this.seedCards();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }
  
  // For backward compatibility
  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.getUserByEmail(username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      displayName: insertUser.displayName || null,
      preferences: { 
        darkMode: false, 
        notifications: true, 
        offlineMode: false,
        aiProvider: 'openai',
        aiPersonalization: {
          interests: [],
          tone: 'casual',
          topicPreferences: {}
        }
      } 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserPreferences(id: number, preferences: any): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;

    const updatedUser = { 
      ...user, 
      preferences: { 
        ...user.preferences,
        ...preferences
      } 
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Theme methods
  async getCardTheme(id: number): Promise<CardTheme | undefined> {
    return this.cardThemes.get(id);
  }

  async getCardThemes(): Promise<CardTheme[]> {
    return Array.from(this.cardThemes.values());
  }

  async createCardTheme(insertTheme: InsertCardTheme): Promise<CardTheme> {
    const id = this.currentCardThemeId++;
    const theme: CardTheme = { 
      ...insertTheme, 
      id,
      description: insertTheme.description || null,
      color: insertTheme.color || null,
      icon: insertTheme.icon || null,
      backgroundImage: insertTheme.backgroundImage || null,
      order: insertTheme.order || null
    };
    this.cardThemes.set(id, theme);
    return theme;
  }

  // Card methods
  async getCard(id: number): Promise<Card | undefined> {
    return this.cards.get(id);
  }

  async getCards(limit = 10, category?: string, themeId?: number): Promise<Card[]> {
    let cards = Array.from(this.cards.values());
    
    if (category && category !== "All") {
      cards = cards.filter(card => card.category === category);
    }
    
    if (themeId) {
      cards = cards.filter(card => card.themeId === themeId);
    }
    
    return cards.slice(0, limit);
  }
  
  async getRelatedCards(cardId: number, limit = 5): Promise<Card[]> {
    const sourceCard = await this.getCard(cardId);
    if (!sourceCard) return [];
    
    // Get cards with similar themes or categories
    let relatedCards = Array.from(this.cards.values()).filter(card => {
      // Don't include the source card
      if (card.id === cardId) return false;
      
      // Get cards with the same theme
      if (card.themeId === sourceCard.themeId) return true;
      
      // Get cards with the same category
      if (card.category === sourceCard.category) return true;
      
      // Get cards with the same tag
      if (card.tag === sourceCard.tag) return true;
      
      return false;
    });
    
    // Randomize the order a bit
    relatedCards.sort(() => Math.random() - 0.5);
    
    return relatedCards.slice(0, limit);
  }

  async createCard(insertCard: InsertCard): Promise<Card> {
    const id = this.currentCardId++;
    const now = new Date();
    const card: Card = { 
      ...insertCard, 
      id,
      tag: insertCard.tag || null,
      difficulty: insertCard.difficulty || null,
      themeId: insertCard.themeId || null,
      imageUrl: insertCard.imageUrl || null,
      followUpQuestions: insertCard.followUpQuestions || null,
      popularity: insertCard.popularity || 0,
      createdAt: now
    };
    this.cards.set(id, card);
    return card;
  }

  // Saved card methods
  async getSavedCards(userId: number): Promise<Card[]> {
    const userSavedCards = Array.from(this.savedCards.values())
      .filter(savedCard => savedCard.userId === userId);
    
    const savedCardIds = userSavedCards.map(savedCard => savedCard.cardId);
    
    return Array.from(this.cards.values())
      .filter(card => savedCardIds.includes(card.id));
  }

  async saveCard(insertSavedCard: InsertSavedCard): Promise<SavedCard> {
    const id = this.currentSavedCardId++;
    const now = new Date();
    const savedCard = { ...insertSavedCard, id, savedAt: now };
    this.savedCards.set(id, savedCard);
    return savedCard;
  }

  async removeSavedCard(userId: number, cardId: number): Promise<boolean> {
    const savedCardEntry = Array.from(this.savedCards.values())
      .find(sc => sc.userId === userId && sc.cardId === cardId);
    
    if (!savedCardEntry) return false;
    
    this.savedCards.delete(savedCardEntry.id);
    return true;
  }
  
  // AI Prompt methods
  async getAiPrompts(userId: number, used?: boolean, limit = 10): Promise<AiPrompt[]> {
    let prompts = Array.from(this.aiPrompts.values())
      .filter(prompt => prompt.userId === userId);
    
    if (used !== undefined) {
      prompts = prompts.filter(prompt => prompt.used === used);
    }
    
    // Sort by created date, newest first
    prompts.sort((a, b) => {
      const aTime = a.createdAt ? a.createdAt.getTime() : 0;
      const bTime = b.createdAt ? b.createdAt.getTime() : 0;
      return bTime - aTime;
    });
    
    return prompts.slice(0, limit);
  }
  
  async getAiPrompt(id: number): Promise<AiPrompt | undefined> {
    return this.aiPrompts.get(id);
  }
  
  async createAiPrompt(insertAiPrompt: InsertAiPrompt): Promise<AiPrompt> {
    const id = this.currentAiPromptId++;
    const now = new Date();
    const aiPrompt: AiPrompt = { 
      id, 
      content: insertAiPrompt.content,
      category: insertAiPrompt.category,
      tag: insertAiPrompt.tag !== undefined ? insertAiPrompt.tag : null,
      difficulty: insertAiPrompt.difficulty !== undefined ? insertAiPrompt.difficulty : null,
      userId: insertAiPrompt.userId,
      provider: insertAiPrompt.provider,
      createdAt: now,
      used: insertAiPrompt.used !== undefined ? insertAiPrompt.used : false,
      feedbackRating: insertAiPrompt.feedbackRating !== undefined ? insertAiPrompt.feedbackRating : null
    };
    this.aiPrompts.set(id, aiPrompt);
    return aiPrompt;
  }
  
  async updateAiPromptFeedback(id: number, rating: number): Promise<AiPrompt | undefined> {
    const aiPrompt = await this.getAiPrompt(id);
    if (!aiPrompt) return undefined;
    
    const updatedPrompt = { ...aiPrompt, feedbackRating: rating };
    this.aiPrompts.set(id, updatedPrompt);
    return updatedPrompt;
  }
  
  async markAiPromptAsUsed(id: number): Promise<AiPrompt | undefined> {
    const aiPrompt = await this.getAiPrompt(id);
    if (!aiPrompt) return undefined;
    
    const updatedPrompt = { ...aiPrompt, used: true };
    this.aiPrompts.set(id, updatedPrompt);
    return updatedPrompt;
  }

  // Seed methods for development
  private seedThemes() {
    const sampleThemes: InsertCardTheme[] = [
      {
        name: "Connection",
        description: "Deepen relationships with meaningful conversations",
        color: "#ddbcea" // lavender
      },
      {
        name: "Reflection",
        description: "Explore your inner world and personal growth",
        color: "#D1E7FF" // light blue
      },
      {
        name: "Adventure",
        description: "Playful questions for fun and exploration",
        color: "#FFEEB3" // light yellow
      },
      {
        name: "Development",
        description: "Discover opportunities for personal development",
        color: "#a5e5d0" // mint green
      },
      {
        name: "Family",
        description: "Strengthen family bonds through conversation",
        color: "#FFCDD2" // light red
      },
      {
        name: "Work Life",
        description: "Professional and career-oriented questions",
        color: "#BBDEFB" // light blue
      },
      {
        name: "Intimacy",
        description: "Build deeper connections with loved ones",
        color: "#F8BBD0" // light pink
      },
      {
        name: "Childhood",
        description: "Revisit and share formative memories",
        color: "#DCEDC8" // light green
      },
      {
        name: "Future Dreams",
        description: "Explore aspirations and plans for tomorrow",
        color: "#B3E5FC" // sky blue
      },
      {
        name: "Values & Beliefs",
        description: "Discover what matters most to you",
        color: "#C8E6C9" // pale green
      }
    ];

    sampleThemes.forEach(theme => {
      this.createCardTheme(theme);
    });
  }

  private seedCards() {
    const sampleCards: InsertCard[] = [
      // Original cards
      {
        content: "What would you change about yourself if you could change just one thing?",
        category: "Self-reflection",
        tag: "Personal Growth",
        difficulty: "Deep",
        themeId: 2 // Reflection theme
      },
      {
        content: "Describe a moment when you felt truly understood by someone.",
        category: "Relationships",
        tag: "Relationships",
        difficulty: "Connecting",
        themeId: 1 // Connection theme
      },
      {
        content: "If you could have dinner with anyone, living or dead, who would it be and why?",
        category: "Fun",
        tag: "Ice Breaker",
        difficulty: "Fun",
        themeId: 3 // Adventure theme
      },
      {
        content: "What is your biggest regret, and how has it shaped who you are today?",
        category: "Self-reflection",
        tag: "Personal Growth",
        difficulty: "Deep",
        themeId: 2 // Reflection theme
      },
      {
        content: "Tell me about someone who changed your perspective on life.",
        category: "Relationships",
        tag: "Relationships",
        difficulty: "Connecting",
        themeId: 1 // Connection theme
      },
      {
        content: "What's a skill you wish you had mastered by now?",
        category: "Growth",
        tag: "Personal Growth",
        difficulty: "Deep",
        themeId: 4 // Development theme
      },
      {
        content: "What is the kindest thing someone has ever done for you?",
        category: "Relationships",
        tag: "Gratitude",
        difficulty: "Connecting",
        themeId: 1 // Connection theme
      },
      {
        content: "If you could live anywhere in the world for a year, where would you go?",
        category: "Fun",
        tag: "Dreams",
        difficulty: "Fun",
        themeId: 3 // Adventure theme
      },
      
      // New cards for expanded categories
      {
        content: "What family tradition do you cherish the most?",
        category: "Family",
        tag: "Traditions",
        difficulty: "Medium",
        themeId: 5 // Family theme
      },
      {
        content: "How has a family member shaped your values?",
        category: "Family",
        tag: "Values",
        difficulty: "Deep",
        themeId: 5 // Family theme
      },
      {
        content: "What's a lesson you learned from work that changed your perspective?",
        category: "Work",
        tag: "Career Growth",
        difficulty: "Medium",
        themeId: 6 // Work Life theme
      },
      {
        content: "How do you maintain work-life balance?",
        category: "Work",
        tag: "Balance",
        difficulty: "Medium",
        themeId: 6 // Work Life theme
      },
      {
        content: "When did you feel most emotionally connected to someone?",
        category: "Intimacy",
        tag: "Connection",
        difficulty: "Deep",
        themeId: 7 // Intimacy theme
      },
      {
        content: "What makes you feel safe in relationships?",
        category: "Intimacy",
        tag: "Safety",
        difficulty: "Deep",
        themeId: 7 // Intimacy theme
      },
      {
        content: "What's your earliest childhood memory?",
        category: "Childhood",
        tag: "Memories",
        difficulty: "Medium",
        themeId: 8 // Childhood theme
      },
      {
        content: "What toy or game from your childhood had the biggest impact on you?",
        category: "Childhood",
        tag: "Toys",
        difficulty: "Light",
        themeId: 8 // Childhood theme
      },
      {
        content: "What does your ideal future look like in 10 years?",
        category: "Future",
        tag: "Dreams",
        difficulty: "Medium",
        themeId: 9 // Future Dreams theme
      },
      {
        content: "What's one thing you want to accomplish before you die?",
        category: "Future",
        tag: "Bucket List",
        difficulty: "Medium",
        themeId: 9 // Future Dreams theme
      },
      {
        content: "What's one desire you've never told anyone about?",
        category: "Desires",
        tag: "Secret Wishes",
        difficulty: "Deep",
        themeId: 9 // Future Dreams theme
      },
      {
        content: "If you could make one wish come true right now, what would it be?",
        category: "Desires",
        tag: "Wishes",
        difficulty: "Medium",
        themeId: 9 // Future Dreams theme
      },
      {
        content: "What value or principle do you refuse to compromise on?",
        category: "Values",
        tag: "Principles",
        difficulty: "Deep",
        themeId: 10 // Values & Beliefs theme
      },
      {
        content: "How have your core values evolved throughout your life?",
        category: "Values",
        tag: "Evolution",
        difficulty: "Deep",
        themeId: 10 // Values & Beliefs theme
      },
      {
        content: "What's one place you must visit before you die?",
        category: "Travel",
        tag: "Bucket List",
        difficulty: "Light",
        themeId: 3 // Adventure theme
      },
      {
        content: "How has travel changed your perspective on life?",
        category: "Travel",
        tag: "Perspective",
        difficulty: "Medium",
        themeId: 3 // Adventure theme
      },
      {
        content: "Do you believe in something greater than yourself?",
        category: "Spirituality",
        tag: "Beliefs",
        difficulty: "Deep",
        themeId: 10 // Values & Beliefs theme
      },
      {
        content: "What practices help you feel connected to yourself?",
        category: "Spirituality",
        tag: "Practices",
        difficulty: "Medium",
        themeId: 10 // Values & Beliefs theme
      },
      {
        content: "What's your biggest fear and how does it influence your decisions?",
        category: "Fears",
        tag: "Influence",
        difficulty: "Deep",
        themeId: 2 // Reflection theme
      },
      {
        content: "When was the last time you faced a significant fear?",
        category: "Fears",
        tag: "Courage",
        difficulty: "Deep",
        themeId: 2 // Reflection theme
      }
    ];

    sampleCards.forEach(card => {
      this.createCard(card);
    });
  }
}

// Create a PostgreSQL implementation of the storage interface
export class PostgresStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    // Use memory store temporarily since we're having issues with PostgreSQL session store
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }
  
  // For backward compatibility
  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.getUserByEmail(username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values({
      ...insertUser,
      preferences: {
        darkMode: false,
        notifications: true,
        offlineMode: false,
        aiProvider: 'openai',
        aiPersonalization: {
          interests: [],
          tone: 'casual',
          topicPreferences: {}
        }
      }
    }).returning();
    return result[0];
  }

  async updateUserPreferences(id: number, preferences: any): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;

    const updatedPreferences = { ...user.preferences, ...preferences };
    const result = await db.update(users)
      .set({ preferences: updatedPreferences })
      .where(eq(users.id, id))
      .returning();
    
    return result[0];
  }

  // Theme methods
  async getCardTheme(id: number): Promise<CardTheme | undefined> {
    const result = await db.select().from(cardThemes).where(eq(cardThemes.id, id)).limit(1);
    return result[0];
  }

  async getCardThemes(): Promise<CardTheme[]> {
    return await db.select().from(cardThemes).orderBy(cardThemes.order);
  }

  async createCardTheme(theme: InsertCardTheme): Promise<CardTheme> {
    const result = await db.insert(cardThemes).values(theme).returning();
    return result[0];
  }

  // Card methods
  async getCard(id: number): Promise<Card | undefined> {
    const result = await db.select().from(cards).where(eq(cards.id, id)).limit(1);
    return result[0];
  }

  async getCards(limit = 10, category?: string, themeId?: number): Promise<Card[]> {
    let query = db.select().from(cards);
    
    const conditions = [];
    
    if (category && category !== "All") {
      conditions.push(eq(cards.category, category));
    }
    
    if (themeId) {
      conditions.push(eq(cards.themeId, themeId));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    return await query.limit(limit);
  }

  async getRelatedCards(cardId: number, limit = 5): Promise<Card[]> {
    const sourceCard = await this.getCard(cardId);
    if (!sourceCard) return [];
    
    const relatedCards = await db.select().from(cards)
      .where(
        or(
          and(eq(cards.themeId, sourceCard.themeId || 0), ne(cards.id, cardId)),
          and(eq(cards.category, sourceCard.category), ne(cards.id, cardId)),
          and(eq(cards.tag, sourceCard.tag || ''), ne(cards.id, cardId))
        )
      )
      .limit(limit);
    
    return relatedCards;
  }

  async createCard(card: InsertCard): Promise<Card> {
    const result = await db.insert(cards).values(card).returning();
    return result[0];
  }

  // Saved card methods
  async getSavedCards(userId: number): Promise<Card[]> {
    // Join savedCards with cards to get the actual card data
    const result = await db.select({
      card: cards
    })
    .from(savedCards)
    .innerJoin(cards, eq(savedCards.cardId, cards.id))
    .where(eq(savedCards.userId, userId));
    
    return result.map(row => row.card);
  }

  async saveCard(savedCard: InsertSavedCard): Promise<SavedCard> {
    const result = await db.insert(savedCards).values(savedCard).returning();
    return result[0];
  }

  async removeSavedCard(userId: number, cardId: number): Promise<boolean> {
    const result = await db.delete(savedCards)
      .where(and(
        eq(savedCards.userId, userId),
        eq(savedCards.cardId, cardId)
      ));
    
    // Handle rowCount being potentially null
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // AI Prompt methods
  async getAiPrompts(userId: number, used?: boolean, limit = 10): Promise<AiPrompt[]> {
    let query = db.select().from(aiPrompts).where(eq(aiPrompts.userId, userId));
    
    // Add used status filter if specified
    if (used !== undefined) {
      query = query.where(eq(aiPrompts.used, used));
    }
    
    // Sort by created date, newest first
    query = query.orderBy(desc(aiPrompts.createdAt)).limit(limit);
    
    return await query;
  }

  async getAiPrompt(id: number): Promise<AiPrompt | undefined> {
    const result = await db.select().from(aiPrompts).where(eq(aiPrompts.id, id)).limit(1);
    return result[0];
  }

  async createAiPrompt(aiPrompt: InsertAiPrompt): Promise<AiPrompt> {
    const result = await db.insert(aiPrompts).values(aiPrompt).returning();
    return result[0];
  }

  async updateAiPromptFeedback(id: number, rating: number): Promise<AiPrompt | undefined> {
    const result = await db.update(aiPrompts)
      .set({ feedbackRating: rating })
      .where(eq(aiPrompts.id, id))
      .returning();
    
    return result[0];
  }

  async markAiPromptAsUsed(id: number): Promise<AiPrompt | undefined> {
    const result = await db.update(aiPrompts)
      .set({ used: true })
      .where(eq(aiPrompts.id, id))
      .returning();
    
    return result[0];
  }
}

// Switch to using PostgreSQL storage
export const storage = new PostgresStorage();
