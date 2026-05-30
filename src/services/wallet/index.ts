import { getWalletBalances } from './moralis';
import { generateChatResponse } from '@/services/ai/gemini';

export async function analyzeWallet(walletAddress: string): Promise<string> {
  const balances = await getWalletBalances(walletAddress);

  if (!balances) {
    return "I couldn't fetch data for that wallet. Please check the address or try again later.";
  }

  const nativeEth = (Number(balances.nativeBalanceWei) / 1e18).toFixed(4);

  const prompt = `
You are a Web3 Portfolio Assistant. The user provided their wallet address: ${walletAddress}.

Here is the data pulled from the blockchain:
Native Balance: ${nativeEth} ETH
Top ERC20 Tokens:
${JSON.stringify(balances.tokens, null, 2)}

Provide a concise, friendly summary of their wallet. Congratulate them if they hold interesting tokens, or give a neutral analysis. Never give financial advice. Keep it under 4 sentences.
  `;

  return await generateChatResponse(prompt);
}
