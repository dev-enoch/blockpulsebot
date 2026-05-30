import { getTrendingTokens, getSimplePrice } from './coingecko';
import { getTopBoostedTokens } from '../safety/dexscreener';
import { generateChatResponse } from '@/services/ai/gemini';

export async function generateMarketSummary(): Promise<string> {
  const trending = await getTrendingTokens();
  const boosted = await getTopBoostedTokens();
  
  // Get prices for top 3 trending and bitcoin
  const topIds = trending.slice(0, 3).map((t: any) => t.id);
  topIds.push('bitcoin');

  const prices = await getSimplePrice(topIds);

  const prompt = `
You are an expert Crypto Market Analyst. Summarize the following market data for the user in a readable, exciting but realistic way.

CoinGecko Trending Tokens:
${JSON.stringify(trending.slice(0, 5), null, 2)}

DexScreener Top Boosted Tokens (Degen Picks):
${JSON.stringify(boosted ? boosted.slice(0, 3) : [], null, 2)}

Current Prices (USD & 24h Change):
${JSON.stringify(prices, null, 2)}

Write a short market report. Include emojis. Be concise. Mention the DexScreener boosted tokens as high-risk trending picks.
  `;

  return await generateChatResponse(prompt);
}
