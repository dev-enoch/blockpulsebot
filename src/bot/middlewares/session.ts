import { BotContext } from '../context';
import Session from '@/models/Session';

export const sessionMiddleware = async (ctx: BotContext, next: () => Promise<void>) => {
  if (!ctx.from) return next();

  const userId = ctx.from.id.toString();

  try {
    let session = await Session.findOne({ userId });

    if (!session) {
      session = await Session.create({ userId });
    }

    ctx.session = session;

    await next();

    // After downstream middlewares finish, save the session
    ctx.session.lastInteraction = new Date();
    await ctx.session.save();

  } catch (error) {
    console.error('Error in session middleware:', error);
    await next();
  }
};
