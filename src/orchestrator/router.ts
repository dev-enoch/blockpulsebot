import { Intent, detectIntent } from './intents';
import { generateChatResponse } from '@/services/ai/gemini';
import { ISession } from '@/models/Session';
import { analyzeTokenSafety } from '@/services/safety';
import { generateMarketSummary } from '@/services/market';
import { generateEducationalPath } from '@/services/learn';
import { analyzeWallet } from '@/services/wallet';

export async function routeMessage(message: string, session: ISession): Promise<string> {
  const intent = detectIntent(message);

  switch (intent) {
    case Intent.SAFETY:
      const addressMatch = message.match(/0x[a-fA-F0-9]{40}/);
      if (addressMatch) {
        return await analyzeTokenSafety(addressMatch[0]);
      }
      return `[SAFETY] I detect you want to check token safety. Please provide a valid 0x contract address.`;
      
    case Intent.LEARN:
      // Simple fallback - normally we would use the session topic
      const topic = message.replace(/learn|explain|what is/gi, '').trim() || 'Blockchain Basics';
      return await generateEducationalPath(topic, 'beginner'); // Hardcoded to beginner for MVP
      
    case Intent.MARKET:
      return await generateMarketSummary();

    case Intent.TOOLS:
      const walletMatch = message.match(/0x[a-fA-F0-9]{40}/);
      if (walletMatch) {
        return await analyzeWallet(walletMatch[0]);
      }
      return `[WALLET TOOLS] Please provide a valid 0x wallet address for me to check balances and tokens.`;
      
    case Intent.CHAT:
    default:
      return await generateChatResponse(message);
  }
}


