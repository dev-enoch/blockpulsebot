import { Context } from 'telegraf';
import { IUser } from '@/models/User';
import { ISession } from '@/models/Session';

export interface BotContext extends Context {
  user: IUser;
  session: ISession;
}
