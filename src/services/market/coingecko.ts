import axios from 'axios';
import { env } from '@/lib/env';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export async function getTrendingTokens() {
  try {
    const response = await axios.get(`${BASE_URL}/search/trending`);
    return response.data.coins.map((coin: any) => ({
      id: coin.item.id,
      name: coin.item.name,
      symbol: coin.item.symbol,
      marketCapRank: coin.item.market_cap_rank,
      priceBtc: coin.item.price_btc,
    }));
  } catch (error) {
    console.error('Error fetching trending tokens from CoinGecko:', error);
    return [];
  }
}

export async function getSimplePrice(ids: string[]) {
  try {
    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids: ids.join(','),
        vs_currencies: 'usd',
        include_24hr_change: 'true',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching prices from CoinGecko:', error);
    return null;
  }
}
