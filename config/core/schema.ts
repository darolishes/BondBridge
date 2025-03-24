import { z } from 'zod';

// Theme Schema
export const ThemeSchema = z.object({
  colors: z.object({
    background: z.string(),
    surface: z.string(),
    surfaceHighlight: z.string(),
    surfaceElevated: z.string(),
    text: z.string(),
    textSecondary: z.string(),
    textTertiary: z.string(),
    textOnPrimary: z.string(),
    primary: z.string(),
    primaryLight: z.string(),
    border: z.string(),
    error: z.string(),
    success: z.string(),
    warning: z.string(),
    progressPrimary: z.string(),
    progressBackground: z.string(),
  }),
  spacing: z.object({
    xs: z.number(),
    sm: z.number(),
    md: z.number(),
    lg: z.number(),
    xl: z.number(),
  }),
  borderRadius: z.object({
    sm: z.number(),
    md: z.number(),
    lg: z.number(),
  }),
});

// Environment Schema
export const EnvSchema = z.object({
  SUPABASE_KEY: z.string(),
  SUPABASE_URL: z.string().url(),
  GROQ_API_KEY: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
});

// App Constants Schema
export const ConstantsSchema = z.object({
  APP_NAME: z.string(),
  API_VERSION: z.string(),
  DEFAULT_LOCALE: z.string(),
  CACHE_DURATION: z.number(),
  IMAGE_SIZES: z.object({
    THUMBNAIL: z.number(),
    PREVIEW: z.number(),
    FULL: z.number(),
  }),
});

// Path Aliases Schema
export const PathSchema = z.object({
  components: z.string(),
  screens: z.string(),
  utils: z.string(),
  hooks: z.string(),
  theme: z.string(),
  types: z.string(),
  assets: z.string(),
});

// Root Config Schema
export const ConfigSchema = z.object({
  theme: ThemeSchema,
  env: EnvSchema,
  constants: ConstantsSchema,
  paths: PathSchema,
});

// Typen aus den Schemas exportieren
export type ThemeConfig = z.infer<typeof ThemeSchema>;
export type EnvConfig = z.infer<typeof EnvSchema>;
export type ConstantsConfig = z.infer<typeof ConstantsSchema>;
export type PathConfig = z.infer<typeof PathSchema>;
export type AppConfig = z.infer<typeof ConfigSchema>;
