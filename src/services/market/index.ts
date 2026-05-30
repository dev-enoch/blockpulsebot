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

Write a clear, structured market report.
DO NOT use any emojis.
Format the output with clear separation of concerns using plain text dashed lines or capital letters.
Include these distinct sections:
1. MARKET OVERVIEW (Bitcoin price & 24h change)
2. TRENDING TOKENS (CoinGecko highlights)
3. HIGH RISK DEGEN PICKS (DexScreener boosts, clearly marked as very high risk)
4. SAFETY REMINDER (A brief warning about volatility)
  `;

  return await generateChatResponse(prompt);
}
