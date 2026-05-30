import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '@/lib/env';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `
You are Blockpulse AI.

You help users:
- learn crypto safely
- understand DeFi
- analyze token risks
- avoid scams

Rules:
- Explain simply
- Never guarantee profits
- Warn about risky investments
- Be concise but educational
`;

export async function generateChatResponse(message: string, history: any[] = []): Promise<string> {
  if (!env.GEMINI_API_KEY) {
    return 'Gemini API key is not configured. I am running in dummy mode. Your message: ' + message;
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_PROMPT,
  });

  const chat = model.startChat({
    history: history.map(h => ({
      role: h.role, // 'user' or 'model'
      parts: [{ text: h.content }],
    })),
  });

  try {
    const result = await chat.sendMessage([{ text: message }]);
    return result.response.text();
  } catch (error) {
    console.error('Error in Gemini Chat:', error);
    return 'Sorry, I encountered an error while thinking.';
  }
}
