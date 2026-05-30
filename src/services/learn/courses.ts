export interface Module {
  title: string;
  content: string;
  quizQuestion?: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  modules: Module[];
}

export const courses: Record<string, Course> = {
  'defi-101': {
    id: 'defi-101',
    name: 'DeFi 101: The Basics',
    description: 'Learn the fundamentals of Decentralized Finance.',
    modules: [
      {
        title: 'Module 1: What is Blockchain?',
        content: 'A blockchain is essentially a public ledger. Imagine a notebook that everyone in the world shares. Whenever someone writes something down (a transaction), everyone else updates their notebook. Because everyone has a copy, nobody can fake a transaction. This is what makes crypto secure and decentralized!',
        quizQuestion: 'Ready for the next module about Smart Contracts? Type "next" or press the button.'
      },
      {
        title: 'Module 2: Smart Contracts',
        content: 'Smart contracts are just code that runs on the blockchain. Think of them like a digital vending machine. If you put in $1 (the condition), it automatically dispenses a soda (the execution). There is no middleman needed to hand you the soda. This automates everything in DeFi.',
        quizQuestion: 'Ready for the final module on Liquidity Pools? Type "next".'
      },
      {
        title: 'Module 3: Liquidity Pools',
        content: 'Since there are no centralized banks to hold money for trading, DeFi relies on Liquidity Pools. A pool is a giant smart contract where users lock up pairs of tokens (like ETH and USDC). When someone wants to trade, they swap directly against this pool. The people who provided the tokens earn a small fee as a reward!',
        quizQuestion: 'Congratulations! You have finished DeFi 101. You can now use the bot tools to analyze tokens or the market.'
      }
    ]
  }
};
