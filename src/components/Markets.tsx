import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { MarketData } from '../types';

interface MarketsProps {
  markets: MarketData[];
}

export default function Markets({ markets }: MarketsProps) {
  return (
    <section className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl massive-italic"
          >
            WHERE WE<br />
            <span className="text-zinc-300">DOMINATE.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {markets.map((market, index) => (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group geometric-border rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="relative h-48 bg-zinc-800 flex items-center justify-center overflow-hidden">
                <img 
                  src={market.imageUrl} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
                <div className="text-7xl opacity-10 font-[900] italic z-0 uppercase tracking-tighter mix-blend-overlay">
                  {market.id === '1' ? 'GREYHOUND' : 'HORSE'}
                </div>
                <div className="z-20 px-4 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase rounded absolute top-4 left-4">
                  {market.id === '1' ? '94%' : '89%'} ACCURACY
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="text-2xl font-[900] italic tracking-tight uppercase">
                    {market.title}
                  </h3>
                  <span className="text-[10px] font-bold text-zinc-500 bg-zinc-950 px-2 py-1 border border-zinc-800 rounded uppercase">
                    Verified Profit Market
                  </span>
                </div>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {market.description}
                </p>

                <motion.a
                  href="https://wa.me/923197139789"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-emerald-500 font-bold text-sm tracking-widest uppercase group/link"
                >
                  GET SIGNALS
                  <svg className="transition-transform group-hover/link:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
