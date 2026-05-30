import axios from 'axios';

const BASE_URL = 'https://api.honeypot.is/v2';

export async function checkHoneypot(tokenAddress: string) {
  try {
    const response = await axios.get(`${BASE_URL}/IsHoneypot`, {
      params: { address: tokenAddress }
    });

    return {
      isHoneypot: response.data.honeypotResult?.isHoneypot || false,
      honeypotReason: response.data.honeypotResult?.honeypotReason,
      buyTax: response.data.simulationResult?.buyTax,
      sellTax: response.data.simulationResult?.sellTax,
    };
  } catch (error) {
    console.error('Error fetching data from Honeypot API:', error);
    return null;
  }
}
