import { getTokenPairData } from './dexscreener';
import { getTokenSecurity } from './goplus';
import { generateChatResponse } from '@/services/ai/gemini';

export async function analyzeTokenSafety(tokenAddress: string): Promise<string> {
  const dexscreenerData = await getTokenPairData(tokenAddress);
  const goPlusData = await getTokenSecurity(tokenAddress, dexscreenerData?.chainId || '1');

  if (!dexscreenerData && !goPlusData) {
    return "I couldn't find any data on that token. It might be too new, or the contract address is invalid. Proceed with extreme caution.";
  }

  const prompt = `
You are a top-tier Smart Contract Auditor. Analyze the following data for token ${tokenAddress} and provide a concise risk report.

DexScreener Data:
${JSON.stringify(dexscreenerData, null, 2)}

GoPlus Security Data:
${JSON.stringify(goPlusData, null, 2)}

Provide your response in a formatted style (e.g. ⚠️ Medium Risk or 🛑 High Risk)
Highlight the main red flags.
Explain what they mean for a retail investor simply.
Never guarantee profits.
  `;

  const report = await generateChatResponse(prompt);
  return report;
}
