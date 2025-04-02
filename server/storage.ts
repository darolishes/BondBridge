import { users, cards, savedCards, type User, type InsertUser, type Card, type InsertCard, type SavedCard, type InsertSavedCard } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPreferences(id: number, preferences: any): Promise<User | undefined>;
  
  // Card methods
  getCard(id: number): Promise<Card | undefined>;
  getCards(limit?: number, category?: string): Promise<Card[]>;
  createCard(card: InsertCard): Promise<Card>;

  // Saved card methods
  getSavedCards(userId: number): Promise<Card[]>;
  saveCard(savedCard: InsertSavedCard): Promise<SavedCard>;
  removeSavedCard(userId: number, cardId: number): Promise<boolean>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cards: Map<number, Card>;
  private savedCards: Map<number, SavedCard>;
  sessionStore: session.SessionStore;
  currentUserId: number;
  currentCardId: number;
  currentSavedCardId: number;

  constructor() {
    this.users = new Map();
    this.cards = new Map();
    this.savedCards = new Map();
    this.currentUserId = 1;
    this.currentCardId = 1;
    this.currentSavedCardId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Add sample cards
    this.seedCards();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, preferences: { darkMode: false, notifications: true, offlineMode: false } };
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

  // Card methods
  async getCard(id: number): Promise<Card | undefined> {
    return this.cards.get(id);
  }

  async getCards(limit = 10, category?: string): Promise<Card[]> {
    let cards = Array.from(this.cards.values());
    
    if (category && category !== "All") {
      cards = cards.filter(card => card.category === category);
    }
    
    return cards.slice(0, limit);
  }

  async createCard(insertCard: InsertCard): Promise<Card> {
    const id = this.currentCardId++;
    const card = { ...insertCard, id };
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

  // Seed methods for development
  private seedCards() {
    const sampleCards: InsertCard[] = [
      {
        content: "What would you change about yourself if you could change just one thing?",
        category: "Self-reflection",
        tag: "Personal Growth",
        difficulty: "Deep"
      },
      {
        content: "Describe a moment when you felt truly understood by someone.",
        category: "Relationships",
        tag: "Relationships",
        difficulty: "Connecting"
      },
      {
        content: "If you could have dinner with anyone, living or dead, who would it be and why?",
        category: "Fun",
        tag: "Ice Breaker",
        difficulty: "Fun"
      },
      {
        content: "What is your biggest regret, and how has it shaped who you are today?",
        category: "Self-reflection",
        tag: "Personal Growth",
        difficulty: "Deep"
      },
      {
        content: "Tell me about someone who changed your perspective on life.",
        category: "Relationships",
        tag: "Relationships",
        difficulty: "Connecting"
      },
      {
        content: "What's a skill you wish you had mastered by now?",
        category: "Growth",
        tag: "Personal Growth",
        difficulty: "Deep"
      },
      {
        content: "What is the kindest thing someone has ever done for you?",
        category: "Relationships",
        tag: "Gratitude",
        difficulty: "Connecting"
      },
      {
        content: "If you could live anywhere in the world for a year, where would you go?",
        category: "Fun",
        tag: "Dreams",
        difficulty: "Fun"
      }
    ];

    sampleCards.forEach(card => {
      this.createCard(card);
    });
  }
}

export const storage = new MemStorage();
