import { z } from 'zod';
import type { CardSet, ImportError } from '../types/cardSet';

const cardSchema = z.object({
  id: z.string().min(1),
  category: z.string().min(1),
  question: z.string().min(1),
  followUps: z.array(z.string()),
  difficulty: z.number().min(1).max(3).int(),
});

const cardSetSchema = z.object({
  packageName: z.string().min(1),
  description: z.string(),
  image: z.string(),
  cards: z.array(cardSchema).min(1),
});

export const validateCardSet = (data: unknown): { success: boolean; error?: ImportError } => {
  try {
    cardSetSchema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: {
          code: 'INVALID_SCHEMA',
          message: 'Invalid card set format',
          details: error.errors,
        },
      };
    }
    return {
      success: false,
      error: {
        code: 'INVALID_JSON',
        message: 'Invalid JSON format',
        details: error,
      },
    };
  }
};

export const isValidCardSet = (data: unknown): data is CardSet => {
  return validateCardSet(data).success;
};
