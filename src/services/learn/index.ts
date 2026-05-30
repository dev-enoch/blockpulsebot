import { generateChatResponse } from '@/services/ai/gemini';

export async function generateEducationalPath(topic: string, level: string = 'beginner'): Promise<string> {
  const prompt = `
You are a Crypto & Web3 Educator. The user wants to learn about: "${topic}".
Their current learning level is: ${level.toUpperCase()}.

Rules:
- Explain simply and use an analogy if possible.
- If they are a beginner, explain fundamental concepts.
- If they are advanced, explain technical details or nuances (like MEV, liquidity math, etc).
- Give them a tiny "quiz" question at the end to test their understanding.
  `;

  return await generateChatResponse(prompt);
}
