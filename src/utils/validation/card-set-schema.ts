import { z } from 'zod';
import type { Card, CardSet } from '@types';

export const cardSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, 'Question is required'),
  category: z.string().min(1, 'Category is required'),
  followUps: z.array(z.string()).default([]),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(1),
});

export const cardSetSchema = z.object({
  packageName: z.string().min(1, 'Package name is required'),
  description: z.string().default(''),
  image: z.string().default(''),
  cards: z.array(cardSchema).min(1, 'At least one card is required'),
});

export type CardSetValidationResult = {
  isValid: boolean;
  errors?: z.ZodError;
};

export type CardSchemaType = z.infer<typeof cardSchema>;
export type CardSetSchemaType = z.infer<typeof cardSetSchema>;
