import { Markup } from 'telegraf';
import { ISession } from '@/models/Session';

export const getMainMenuKeyboard = (session?: ISession) => {
  const learningButtonText = session?.courseName ? 'Continue Learning Path' : 'Start Learning Path';

  return Markup.keyboard([
    ['Support', 'Help'],
    ['Check Safety', 'Learn Crypto'],
    [learningButtonText, 'Market Insight'],
    ['Ask AI', 'Tools']
  ]).resize();
};
