export enum Intent {
  CHAT = 'CHAT',
  LEARN = 'LEARN',
  SAFETY = 'SAFETY',
  MARKET = 'MARKET',
  TOOLS = 'TOOLS',
}

export function detectIntent(message: string): Intent {
  // Simplistic intent detection (could use an LLM router later)
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes('learn') || lowerMsg.includes('explain') || lowerMsg.includes('what is')) {
    return Intent.LEARN;
  }
  
  if (lowerMsg.includes('safe') || lowerMsg.includes('scam') || lowerMsg.includes('risk') || lowerMsg.match(/0x[a-fA-F0-9]{40}/) || message.match(/[1-9A-HJ-NP-Za-km-z]{32,44}/)) {
    return Intent.SAFETY;
  }

  if (lowerMsg.includes('price') || lowerMsg.includes('market') || lowerMsg.includes('trending')) {
    return Intent.MARKET;
  }

  if (lowerMsg.includes('wallet') || lowerMsg.includes('nft') || lowerMsg.includes('balance')) {
    return Intent.TOOLS;
  }

  return Intent.CHAT;
}
