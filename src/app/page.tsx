import React from 'react';

export default function Home() {
  const telegramUrl = "https://t.me/testblockpulsebot";

  return (
    <main className="min-h-screen relative flex flex-col items-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow -top-[200px] -left-[200px]"></div>
      <div className="ambient-glow top-[40%] -right-[200px] bg-[radial-gradient(circle,rgba(6,182,212,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>

      {/* Navbar */}
      <nav className="w-full max-w-7xl px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            B
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Blockpulse</span>
        </div>
        <a 
          href={telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Open App
        </a>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center mt-20 md:mt-32 z-10">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold tracking-wide uppercase shadow-[0_0_20px_rgba(139,92,246,0.1)]">
          ✨ Powered by Gemini 1.5
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Your Autonomous Web3 <br className="hidden md:block" />
          <span className="text-gradient-animated">AI Companion</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Trade smarter, analyze token risks instantly, and master DeFi concepts with Blockpulse. Your all-in-one crypto terminal right inside Telegram.
        </p>

        <a 
          href={telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full -z-10 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <span className="mr-2">Start Chatting on Telegram</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </a>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl px-6 py-32 z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">A complete Web3 toolkit.</h2>
          <p className="text-slate-400">Everything you need to navigate the markets safely.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="glass-panel rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300 group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 border border-cyan-500/30 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Safety Analyzer</h3>
            <p className="text-slate-400 leading-relaxed">Paste any contract address. We instantly audit it for honeypots, tax traps, and liquidity risks using GoPlus and DexScreener data.</p>
          </div>

          <div className="glass-panel rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300 group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Market Insights</h3>
            <p className="text-slate-400 leading-relaxed">Get AI-summarized overviews of trending tokens, top boosted degen picks, and live price action directly from CoinGecko.</p>
          </div>

          <div className="glass-panel rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300 group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 border border-pink-500/30 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Learning Paths</h3>
            <p className="text-slate-400 leading-relaxed">Level up your Web3 knowledge. Start an interactive, module-based curriculum teaching you everything from basic Blockchain to complex DeFi strategies.</p>
          </div>

          <div className="glass-panel rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300 group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30 group-hover:scale-110 transition-transform">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Portfolio Tools</h3>
            <p className="text-slate-400 leading-relaxed">Track any wallet. Paste an 0x address to instantly parse their native token balance and top ERC-20 holdings via Moralis.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center border-t border-white/5 mt-auto z-10">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Blockpulse. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
