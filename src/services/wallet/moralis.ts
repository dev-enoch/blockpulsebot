import axios from 'axios';
import { env } from '@/lib/env';

const BASE_URL = 'https://deep-index.moralis.io/api/v2.2';

export async function getWalletBalances(walletAddress: string, chain: string = 'eth') {
  if (!env.MORALIS_API_KEY) {
    console.warn('Moralis API key missing. Returning dummy data.');
    return null;
  }

  try {
    const headers = {
      'X-API-Key': env.MORALIS_API_KEY,
      'accept': 'application/json'
    };

    // Fetch Native Balance
    const nativeRes = await axios.get(`${BASE_URL}/${walletAddress}/balance`, {
      params: { chain },
      headers
    });

    // Fetch Token Balances
    const tokenRes = await axios.get(`${BASE_URL}/${walletAddress}/erc20`, {
      params: { chain },
      headers
    });

    return {
      nativeBalanceWei: nativeRes.data.balance,
      tokens: tokenRes.data.slice(0, 5).map((t: any) => ({
        symbol: t.symbol,
        name: t.name,
        balanceFormatted: (Number(t.balance) / Math.pow(10, Number(t.decimals))).toString(),
      }))
    };
  } catch (error) {
    console.error('Error fetching wallet from Moralis:', error);
    return null;
  }
}
