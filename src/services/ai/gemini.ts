import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { AgentExecutor, createToolCallingAgent } from 'langchain/agents';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { DynamicTool } from '@langchain/core/tools';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { env } from '@/lib/env';

import { analyzeTokenSafety } from '@/services/safety';
import { generateMarketSummary } from '@/services/market';
import { getWalletBalances } from '@/services/wallet/moralis';
import SessionModel, { ISession } from '@/models/Session';

// Initialize the model
const model = new ChatGoogleGenerativeAI({
  modelName: 'gemini-2.5-flash',
  apiKey: env.GEMINI_API_KEY || '',
  temperature: 0.3,
});

// Define tools
const safetyTool = new DynamicTool({
  name: 'analyze_token_safety',
  description: 'Use this tool when the user asks to check if a token is safe, risky, or wants analysis on a specific contract address. Input should be the contract address (e.g., 0x...).',
  func: async (tokenAddress: string) => {
    return await analyzeTokenSafety(tokenAddress);
  },
});

const marketTool = new DynamicTool({
  name: 'get_market_summary',
  description: 'Use this tool when the user asks for market prices, trends, Bitcoin/Ethereum prices, or general crypto market overview. Input can be empty.',
  func: async () => {
    return await generateMarketSummary();
  },
});

const walletTool = new DynamicTool({
  name: 'analyze_wallet',
  description: 'Use this tool when the user provides a wallet address (0x...) and wants to see their balances, portfolio, or tokens. Input should be the wallet address.',
  func: async (walletAddress: string) => {
    const balances = await getWalletBalances(walletAddress);
    if (!balances) return "Could not fetch wallet data.";
    return JSON.stringify(balances);
  },
});

const tools = [safetyTool, marketTool, walletTool];

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

If the user asks to learn about a topic:
- Explain simply and use an analogy if possible.
- Give them a tiny "quiz" question at the end to test their understanding.

If you use a tool to get data, format the tool's raw output into a friendly, concise message following the rules above.
`;

const prompt = ChatPromptTemplate.fromMessages([
  ['system', SYSTEM_PROMPT],
  new MessagesPlaceholder('chat_history'),
  ['human', '{input}'],
  new MessagesPlaceholder('agent_scratchpad'),
]);

const agent = createToolCallingAgent({
  llm: model,
  tools,
  prompt,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
});

export async function generateChatResponse(message: string, session: ISession): Promise<string> {
  if (!env.GEMINI_API_KEY) {
    return 'Gemini API key is not configured. I am running in dummy mode. Your message: ' + message;
  }

  // Convert mongoose messages to Langchain messages
  const chatHistory = (session.messages || []).map((msg) => {
    if (msg.role === 'human') return new HumanMessage(msg.content);
    return new AIMessage(msg.content);
  });

  try {
    const result = await agentExecutor.invoke({
      input: message,
      chat_history: chatHistory,
    });

    let text = result.output;
    // Strip common markdown just in case the AI disobeys
    text = text.replace(/\*\*/g, '').replace(/### /g, '').replace(/## /g, '').replace(/# /g, '');

    // Save to history using sliding window (keep last 10 messages = 5 turns)
    if (!session.messages) session.messages = [];
    session.messages.push({ role: 'human', content: message });
    session.messages.push({ role: 'assistant', content: text });
    
    if (session.messages.length > 20) {
      session.messages = session.messages.slice(session.messages.length - 20);
    }
    
    return text;
  } catch (error) {
    console.error('Error in Langchain Agent:', error);
    return 'Sorry, I encountered an error while thinking.';
  }
}
