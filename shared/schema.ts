import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  preferences: jsonb("preferences").$type<UserPreferences>(),
});

export type UserPreferences = {
  darkMode: boolean;
  notifications: boolean;
  offlineMode: boolean;
  aiProvider?: 'openai' | 'gemini';
  aiPersonalization?: {
    interests?: string[];
    tone?: 'casual' | 'deep' | 'philosophical' | 'humorous' | 'challenging';
    topicPreferences?: Record<string, number>; // Category => preference score
  };
};

export const insertUserSchema = createInsertSchema(users).pick({
  password: true,
  email: true,
  displayName: true,
});

export const cardThemes = pgTable("card_themes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color"),
  icon: text("icon"),
  backgroundImage: text("background_image"),
  order: integer("order"),
});

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tag: text("tag"),
  difficulty: text("difficulty"),
  themeId: integer("theme_id"),
  imageUrl: text("image_url"),
  followUpQuestions: text("follow_up_questions").array(),
  popularity: integer("popularity").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCardThemeSchema = createInsertSchema(cardThemes).pick({
  name: true,
  description: true,
  color: true,
  icon: true,
  backgroundImage: true,
  order: true,
});

export const insertCardSchema = createInsertSchema(cards).pick({
  content: true,
  category: true,
  tag: true,
  difficulty: true,
  themeId: true,
  imageUrl: true,
  followUpQuestions: true,
  popularity: true,
});

export const savedCards = pgTable("saved_cards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  cardId: integer("card_id").notNull(),
  savedAt: timestamp("saved_at").defaultNow(),
});

export const insertSavedCardSchema = createInsertSchema(savedCards).pick({
  userId: true,
  cardId: true,
});

export const aiPrompts = pgTable("ai_prompts", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tag: text("tag"),
  difficulty: text("difficulty"),
  userId: integer("user_id").notNull(),
  provider: text("provider").notNull(), // 'openai' or 'gemini'
  used: boolean("used").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  feedbackRating: integer("feedback_rating"), // 1-5 rating
});

export const insertAiPromptSchema = createInsertSchema(aiPrompts).pick({
  content: true,
  category: true,
  tag: true,
  difficulty: true,
  userId: true,
  provider: true,
  used: true,
  feedbackRating: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCardTheme = z.infer<typeof insertCardThemeSchema>;
export type CardTheme = typeof cardThemes.$inferSelect;

export type InsertCard = z.infer<typeof insertCardSchema>;
export type Card = typeof cards.$inferSelect;

export type InsertSavedCard = z.infer<typeof insertSavedCardSchema>;
export type SavedCard = typeof savedCards.$inferSelect;

export type InsertAiPrompt = z.infer<typeof insertAiPromptSchema>;
export type AiPrompt = typeof aiPrompts.$inferSelect;
