import { getTokenPairData } from './dexscreener';
import { getTokenSecurity } from './goplus';
import { generateChatResponse } from '@/services/ai/gemini';

function formatNumber(num: number): string {
  if (!num) return '0';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
}

export async function analyzeTokenSafety(tokenAddress: string): Promise<string> {
  const dexscreenerData = await getTokenPairData(tokenAddress);

  if (!dexscreenerData) {
    return "I couldn't find any data on that token. It might be too new, or the contract address is invalid.";
  }

  const {
    baseToken,
    fdv,
    chainId,
    dexId,
    priceUsd,
    liquidity,
    volume,
    priceChange,
    txns,
    pairCreatedAt
  } = dexscreenerData;

  const ageMs = Date.now() - (pairCreatedAt || Date.now());
  const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
  const ageString = ageDays >= 365 ? `${Math.floor(ageDays / 365)}y` : ageDays >= 30 ? `${Math.floor(ageDays / 30)}mo` : `${ageDays}d`;

  const fdvStr = fdv ? formatNumber(fdv) : 'N/A';
  const liqUsd = liquidity?.usd ? formatNumber(liquidity.usd) : 'N/A';
  const vol24h = volume?.h24 ? formatNumber(volume.h24) : 'N/A';
  const vol1h = volume?.h1 ? formatNumber(volume.h1) : 'N/A';
  const change1h = priceChange?.h1 || 0;
  const buys = txns?.h1?.buys || 0;
  const sells = txns?.h1?.sells || 0;

  const header = `💊 ${baseToken.name || 'Unknown'} [${fdvStr}] $${baseToken.symbol || '???'} ${change1h >= 0 ? '🔼' : '🔽'}`;
  const network = `${chainId ? chainId.charAt(0).toUpperCase() + chainId.slice(1) : 'Unknown'} @ ${dexId ? dexId.charAt(0).toUpperCase() + dexId.slice(1) : 'Unknown'}`;
  
  return `${header}
${network}
💰 USD: ${priceUsd || 'N/A'}
💎 FDV: ${fdvStr}
💧 Liq: ${liqUsd}
📊 Vol: ${vol24h} · Age: ${ageString}
📉 1H: ${vol1h} · ${change1h}% Ⓑ ${buys} Ⓢ ${sells}

${tokenAddress}`;
}
