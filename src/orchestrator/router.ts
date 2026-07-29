import { ISession } from '@/models/Session';
import { generateChatResponse } from '@/services/ai/gemini';

export async function routeMessage(message: string, session: ISession): Promise<string> {
  // Let the Langchain Agent Executor handle routing and tool calling
  return await generateChatResponse(message, session);
}
