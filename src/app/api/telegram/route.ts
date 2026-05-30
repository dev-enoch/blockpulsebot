import { bot } from '@/bot';
import { env } from '@/lib/env';
import { connectToDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    await bot.handleUpdate(body);
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Error handling Telegram webhook:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

