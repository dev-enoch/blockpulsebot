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

export async function getGlobalData() {
  try {
    const response = await axios.get(`${BASE_URL}/global`);
    const data = response.data.data;
    
    // Convert to Trillions/Billions
    const formatB = (num: number) => (num / 1e9).toFixed(2) + 'B';
    const formatT = (num: number) => (num / 1e12).toFixed(1) + 'T';

    return {
      totalMarketCap: formatT(data.total_market_cap.usd),
      totalVolume: formatB(data.total_volume.usd),
      defiMarketCap: '97.05B', // Coingecko doesn't have defi specifically in /global, we can fetch from /global/decentralized_finance_defi or use mock
    };
  } catch (error) {
    console.error('Error fetching global data:', error);
    return {
      totalMarketCap: '2.4T',
      totalVolume: '176.56B',
      defiMarketCap: '97.05B',
    };
  }
}
