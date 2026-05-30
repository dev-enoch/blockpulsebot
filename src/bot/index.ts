import { Telegraf, Markup } from 'telegraf';
import { env } from '@/lib/env';
import { routeMessage } from '@/orchestrator/router';
import { BotContext } from './context';
import { userMiddleware } from './middlewares/user';
import { sessionMiddleware } from './middlewares/session';
import { rateLimitMiddleware } from './middlewares/rateLimit';
import { getMainMenuKeyboard } from './keyboards/main';
import { courses } from '@/services/learn/courses';

export const bot = new Telegraf<BotContext>(env.BOT_TOKEN);

// Global Error Handler
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}`, err);
  ctx.reply('Oops, something went wrong on my end. Please try again later.').catch(console.error);
});

// Middlewares
bot.use(rateLimitMiddleware);
bot.use(userMiddleware);
bot.use(sessionMiddleware);

// Basic Commands
bot.start((ctx) => {
  ctx.reply('Welcome to Blockpulse AI! I am your Crypto AI Assistant. Use the menu below or type your question.', getMainMenuKeyboard(ctx.session));
});

bot.help((ctx) => {
  ctx.reply('Here are the available commands:\n/start - Start the bot\n/help - Show this message\n/learn - Learn Crypto\n/market - Market Insights\n/safety - Token Safety Check', getMainMenuKeyboard(ctx.session));
});

// Reply Keyboard Handlers
bot.hears('Support', async (ctx) => {
  ctx.reply('Need support? Please email support@blockpulse.ai or ask me any question directly!');
});

bot.hears('Help', async (ctx) => {
  ctx.reply('You can ask me to analyze tokens (paste a 0x address), check wallet balances, fetch market data, or explain crypto concepts!');
});

bot.hears('Check Safety', async (ctx) => {
  ctx.reply('To check token safety, please paste a valid 0x contract address in the chat.');
});

bot.hears('Learn Crypto', async (ctx) => {
  ctx.reply('What crypto topic would you like to learn about? (e.g., "explain DeFi", "what is a liquidity pool")');
});

bot.hears(['Start Learning Path', 'Continue Learning Path'], async (ctx) => {
  let courseName = ctx.session.courseName;
  let nextIndex = ctx.session.currentModuleIndex || 0;

  if (!courseName) {
    ctx.session.courseName = 'defi-101';
    ctx.session.currentModuleIndex = 0;
    await ctx.session.save();
    courseName = 'defi-101';
    nextIndex = 0;
  }

  const course = courses[courseName];
  if (!course) return;

  const module = course.modules[nextIndex];
  const isLast = nextIndex === course.modules.length - 1;
  const buttons = isLast ? [] : [Markup.button.callback('Next Module ➡️', 'next_module')];
  
  await ctx.reply(`📚 <b>${course.name}</b>\n\n${course.description}\n\n<b>${module.title}</b>\n\n${module.content}\n\n<i>${module.quizQuestion}</i>`, {
    parse_mode: 'HTML',
    ...(buttons.length > 0 ? Markup.inlineKeyboard([buttons]) : {})
  });
});

bot.action('next_module', async (ctx) => {
  await ctx.answerCbQuery();
  
  if (!ctx.session.courseName) return;

  const course = courses[ctx.session.courseName];
  if (!course) return;

  const nextIndex = (ctx.session.currentModuleIndex || 0) + 1;
  
  if (nextIndex >= course.modules.length) {
    ctx.session.courseName = undefined;
    ctx.session.currentModuleIndex = 0;
    await ctx.session.save();
    return ctx.reply('You have completed the learning path! Great job! 🎉', getMainMenuKeyboard(ctx.session));
  }

  ctx.session.currentModuleIndex = nextIndex;
  await ctx.session.save();

  const module = course.modules[nextIndex];
  const isLast = nextIndex === course.modules.length - 1;
  const buttons = isLast ? [] : [Markup.button.callback('Next Module ➡️', 'next_module')];

  await ctx.reply(`<b>${module.title}</b>\n\n${module.content}\n\n<i>${module.quizQuestion}</i>`, {
    parse_mode: 'HTML',
    ...(buttons.length > 0 ? Markup.inlineKeyboard([buttons]) : {})
  });
});

bot.hears('Market Insight', async (ctx) => {
  ctx.sendChatAction('typing').catch(console.error);
  const replyText = await routeMessage('market', ctx.session);
  ctx.reply(replyText);
});

bot.hears('Ask AI', async (ctx) => {
  ctx.reply('I am Blockpulse AI. Ask me anything about crypto, trading, or web3!');
});

bot.hears('Tools', async (ctx) => {
  ctx.reply('Wallet Tools: Paste a 0x wallet address in the chat to see a summary of its balances and top tokens.');
});

bot.on('text', async (ctx) => {
  const message = ctx.message.text;
  ctx.sendChatAction('typing').catch(console.error); // Send typing indicator
  
  const replyText = await routeMessage(message, ctx.session);
  ctx.reply(replyText);
});


