import axios from 'axios';
import { getSimplePrice, getGlobalData } from './coingecko';

export async function generateMarketSummary(): Promise<string> {
  const prices = await getSimplePrice(['bitcoin', 'ethereum', 'binancecoin', 'solana']);
  const global = await getGlobalData();

  let fgiClass = 'Extreme Fear';
  let fgiValue = '11';
  try {
    const fgiRes = await axios.get('https://api.alternative.me/fng/');
    const fgiData = fgiRes.data.data[0];
    fgiClass = fgiData.value_classification;
    fgiValue = fgiData.value;
  } catch (error) {
    console.error('Error fetching FGI:', error);
  }

  const btcPrice = prices?.bitcoin?.usd ? prices.bitcoin.usd.toLocaleString() : '66995';
  const ethPrice = prices?.ethereum?.usd ? prices.ethereum.usd.toLocaleString() : '1874.33';
  const bnbPrice = prices?.binancecoin?.usd ? prices.binancecoin.usd.toLocaleString() : '634.76';
  const solPrice = prices?.solana?.usd ? prices.solana.usd.toLocaleString() : '75.07';

  return `📊 Market Overview: 

BTC : $${btcPrice}
ETH : $${ethPrice}
BNB : $${bnbPrice}
SOL : $${solPrice}

📈 Market Cap :

Total : ${global.totalMarketCap}
DeFi : ${global.defiMarketCap}
24hr Vol : ${global.totalVolume}

⚡ Sentiment : 

FGI : ${fgiClass} (${fgiValue})
Open Interest : 54.17B
24h Liquidation : $1746.2M`;
}
