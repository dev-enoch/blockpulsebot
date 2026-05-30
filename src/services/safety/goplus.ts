import axios from 'axios';

const BASE_URL = 'https://api.gopluslabs.io/api/v1';

// We default to chain_id 1 (Ethereum) and 56 (BSC) or let the orchestrator pass it
export async function getTokenSecurity(tokenAddress: string, chainId: string = '1') {
  try {
    const response = await axios.get(`${BASE_URL}/token_security/${chainId}`, {
      params: {
        contract_addresses: tokenAddress.toLowerCase(),
      },
    });

    const data = response.data?.result?.[tokenAddress.toLowerCase()];

    if (!data) return null;

    return {
      isHoneypot: data.is_honeypot === '1',
      isMintable: data.is_mintable === '1',
      isProxy: data.is_proxy === '1',
      ownerAddress: data.owner_address,
      canTakeBackOwnership: data.can_take_back_ownership === '1',
      isBlacklisted: data.is_blacklisted === '1',
      buyTax: data.buy_tax,
      sellTax: data.sell_tax,
    };
  } catch (error) {
    console.error('Error fetching data from GoPlus:', error);
    return null;
  }
}
