import { BotContext } from '../context';

const rateLimitMap = new Map<number, number>();
const LIMIT_MS = 2000; // 2 seconds between messages

export const rateLimitMiddleware = async (ctx: BotContext, next: () => Promise<void>) => {
  if (!ctx.from) return next();

  const userId = ctx.from.id;
  const now = Date.now();
  const lastUpdate = rateLimitMap.get(userId);

  if (lastUpdate && now - lastUpdate < LIMIT_MS) {
    // User is sending messages too fast
    await ctx.reply('⏳ Please wait a moment before sending another message.');
    return;
  }

  rateLimitMap.set(userId, now);
  return next();
};
