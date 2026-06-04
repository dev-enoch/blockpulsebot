import axios from 'axios';

const BASE_URL = 'https://api.dexscreener.com/latest/dex';

export async function getTokenPairData(tokenAddress: string) {
  try {
    const response = await axios.get(`${BASE_URL}/tokens/${tokenAddress}`);
    
    if (!response.data || !response.data.pairs || response.data.pairs.length === 0) {
      return null;
    }

    // Usually the first pair is the most liquid one
    const bestPair = response.data.pairs[0];

    return {
      chainId: bestPair.chainId,
      dexId: bestPair.dexId,
      url: bestPair.url,
      pairAddress: bestPair.pairAddress,
      baseToken: bestPair.baseToken,
      quoteToken: bestPair.quoteToken,
      priceUsd: bestPair.priceUsd,
      liquidity: bestPair.liquidity,
      volume: bestPair.volume,
      fdv: bestPair.fdv,
      txns: bestPair.txns,
      priceChange: bestPair.priceChange,
      pairCreatedAt: bestPair.pairCreatedAt,
    };
  } catch (error) {
    console.error('Error fetching data from DexScreener:', error);
    return null;
  }
}

export async function getTopBoostedTokens() {
  try {
    const response = await axios.get(`https://api.dexscreener.com/token-boosts/top/v1`);
    return response.data; // Array of top boosted tokens
  } catch (error) {
    console.error('Error fetching top boosts from DexScreener:', error);
    return null;
  }
}
