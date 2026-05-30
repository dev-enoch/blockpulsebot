import { BotContext } from '../context';
import User from '@/models/User';

export const userMiddleware = async (ctx: BotContext, next: () => Promise<void>) => {
  if (!ctx.from) return next();

  const telegramId = ctx.from.id.toString();
  
  try {
    let user = await User.findOne({ telegramId });

    if (!user) {
      user = await User.create({
        telegramId,
        username: ctx.from.username,
        firstName: ctx.from.first_name,
        learningLevel: 'beginner',
      });
    }

    ctx.user = user;
  } catch (error) {
    console.error('Error fetching/creating user:', error);
  }

  return next();
};
