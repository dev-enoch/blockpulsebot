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

CRITICAL RULES FOR EVERY RESPONSE:
1. NEVER write paragraphs. Use short bullet points ONLY.
2. Keep it EXTREMELY brief (maximum 3-4 short sentences total).
3. Use simple, 8th-grade English. No big grammar or complex jargon.
4. NEVER mention where you get your data from (do not say CoinGecko, DexScreener, etc. Just state the facts).
5. Explain simply and be concise.
6. Never guarantee profits and always warn about risks.
7. IMPORTANT: DO NOT use Markdown formatting (like **, ##, or *). Output pure plain text only. Use basic dashes (-) for lists.
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
    let text = result.response.text();
    // Strip common markdown just in case the AI disobeys
    text = text.replace(/\*\*/g, '').replace(/### /g, '').replace(/## /g, '').replace(/# /g, '');
    return text;
  } catch (error) {
    console.error('Error in Gemini Chat:', error);
    return 'Sorry, I encountered an error while thinking.';
  }
}
