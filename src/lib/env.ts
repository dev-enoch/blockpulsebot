import { z } from 'zod';

const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, 'BOT_TOKEN is required'),
  APP_URL: z.string().url('APP_URL must be a valid URL'),
  GEMINI_API_KEY: z.string().optional(),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  COINGECKO_API: z.string().optional(),
  DEXSCREENER_API: z.string().optional(),
  GOPLUS_API: z.string().optional(),
  MORALIS_API_KEY: z.string().optional(),
});

export const env = envSchema.parse({
  BOT_TOKEN: process.env.BOT_TOKEN,
  APP_URL: process.env.APP_URL,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  MONGODB_URI: process.env.MONGODB_URI,
  COINGECKO_API: process.env.COINGECKO_API,
  DEXSCREENER_API: process.env.DEXSCREENER_API,
  GOPLUS_API: process.env.GOPLUS_API,
  MORALIS_API_KEY: process.env.MORALIS_API_KEY,
});
