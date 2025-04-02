import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  displayName: text("display_name"),
  preferences: jsonb("preferences").$type<UserPreferences>(),
});

export type UserPreferences = {
  darkMode: boolean;
  notifications: boolean;
  offlineMode: boolean;
};

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  displayName: true,
});

export const cardThemes = pgTable("card_themes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color"),
});

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tag: text("tag"),
  difficulty: text("difficulty"),
  themeId: integer("theme_id"),
});

export const insertCardThemeSchema = createInsertSchema(cardThemes).pick({
  name: true,
  description: true,
  color: true,
});

export const insertCardSchema = createInsertSchema(cards).pick({
  content: true,
  category: true,
  tag: true,
  difficulty: true,
  themeId: true,
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

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCardTheme = z.infer<typeof insertCardThemeSchema>;
export type CardTheme = typeof cardThemes.$inferSelect;

export type InsertCard = z.infer<typeof insertCardSchema>;
export type Card = typeof cards.$inferSelect;

export type InsertSavedCard = z.infer<typeof insertSavedCardSchema>;
export type SavedCard = typeof savedCards.$inferSelect;
