import dotenv from 'dotenv';

export interface EnvConfig {
  SUPABASE_KEY: string;
  SUPABASE_URL: string;
  GROQ_API_KEY: string;
  NODE_ENV?: 'development' | 'production' | 'test';
}

// Validierung der Umgebungsvariablen
export const validateEnvConfig = (env: any): env is EnvConfig => {
  if (!env.SUPABASE_KEY || typeof env.SUPABASE_KEY !== 'string') {
    throw new Error('SUPABASE_KEY ist erforderlich');
  }
  if (!env.SUPABASE_URL || typeof env.SUPABASE_URL !== 'string') {
    throw new Error('SUPABASE_URL ist erforderlich');
  }
  if (!env.GROQ_API_KEY || typeof env.GROQ_API_KEY !== 'string') {
    throw new Error('GROQ_API_KEY ist erforderlich');
  }
  if (env.NODE_ENV && !['development', 'production', 'test'].includes(env.NODE_ENV)) {
    throw new Error('NODE_ENV muss development, production oder test sein');
  }
  return true;
};

export const loadEnvConfig = () => {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
  const env = result.parsed;
  if (!env || !validateEnvConfig(env)) {
    throw new Error('Ungültige Umgebungsvariablen');
  }
  return env;
};

// Exportiere die getypten Umgebungsvariablen
export const envConfig = loadEnvConfig();
