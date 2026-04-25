import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Markets from './components/Markets';
import WinningProofs from './components/WinningProofs';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminPanel from './components/AdminPanel';
import { MarketData, Proof } from './types';

const INITIAL_MARKETS: MarketData[] = [
  {
    id: '1',
    type: 'GREYHOUND RACING',
    title: 'GREYHOUND RACING',
    description: 'Mastering high-speed dynamics with institutional-grade algorithms. Get precise entry points for major greyhound tracks worldwide.',
    imageUrl: 'https://images.unsplash.com/photo-1574182414343-6949033328e3?w=1200&q=80'
  },
  {
    id: '2',
    type: 'HORSE RACING',
    title: 'HORSE RACING',
    description: 'Dominating horse markets with real-time analytics and insider-level data modeling for consistent professional returns.',
    imageUrl: 'https://images.unsplash.com/photo-1553285991-4c74211f5097?w=1200&q=80'
  }
];

const INITIAL_PROOFS: Proof[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?w=800&q=80',
    caption: 'Member payout success',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80',
    caption: 'Big win on Greyhound finals',
    timestamp: '4 hours ago'
  }
];

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [markets, setMarkets] = useState<MarketData[]>(() => {
    const saved = localStorage.getItem('man-pro-markets');
    return saved ? JSON.parse(saved) : INITIAL_MARKETS;
  });

  const [proofs, setProofs] = useState<Proof[]>(() => {
    const saved = localStorage.getItem('man-pro-proofs');
    return saved ? JSON.parse(saved) : INITIAL_PROOFS;
  });

  const handleWAOpen = () => {
    window.open('https://wa.me/923197139789', '_blank');
  };

  const handleGlobalClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Exclude sections that should NOT trigger WhatsApp
    if (
      target.closest('[data-no-wa="true"]') || 
      target.tagName === 'IMG' || 
      target.closest('button') || 
      target.closest('a') ||
      isAdminOpen
    ) {
      return;
    }
    
    handleWAOpen();
  };

  useEffect(() => {
    localStorage.setItem('man-pro-markets', JSON.stringify(markets));
  }, [markets]);

  useEffect(() => {
    localStorage.setItem('man-pro-proofs', JSON.stringify(proofs));
  }, [proofs]);

  return (
    <main 
      onClick={handleGlobalClick}
      className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-500 selection:text-black cursor-pointer"
    >
      <Header onAdminClick={() => setIsAdminOpen(true)} />
      
      <Hero />
      
      <Markets markets={markets} />
      
      <WinningProofs proofs={proofs} />
      
      <section className="py-32 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl massive-italic mb-8">
            READY TO JOIN THE <span className="text-emerald-500">PROS?</span>
          </h2>
          <p className="text-zinc-500 text-xl font-medium mb-12 max-w-2xl mx-auto">
            Stop gambling, start trading. Our signals are processed by elite algorithms designed for one thing: Accuracy.
          </p>
          <a 
            href="https://wa.me/923197139789"
            className="inline-block bg-white text-black px-12 py-6 text-2xl font-black uppercase tracking-tighter hover:bg-emerald-500 transition-colors"
          >
            START WINNING NOW
          </a>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] border-l border-zinc-800 pl-4">
            Elite Access Only • Verified Algorithms • Real-Time Data
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-[900] italic tracking-tighter opacity-50">MAN PRO.</p>
              <button 
                data-no-wa="true"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAdminOpen(true);
                }}
                className="text-zinc-700 hover:text-emerald-500 transition-colors p-1"
                title="Admin Access"
              >
                <Lock size={16} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-zinc-600 font-bold text-[10px] tracking-widest uppercase">
                © 2026 ELITE SIGNALS
              </p>
            </div>
          </div>
        </div>
      </footer>

      <FloatingWhatsApp />
      
      <div data-no-wa="true">
        <AdminPanel 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
          markets={markets}
          onUpdateMarkets={setMarkets}
          proofs={proofs}
          onUpdateProofs={setProofs}
        />
      </div>
    </main>
  );
}
