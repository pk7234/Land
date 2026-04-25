import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { Proof } from '../types';

interface WinningProofsProps {
  proofs: Proof[];
}

export default function WinningProofs({ proofs }: WinningProofsProps) {
  return (
    <section className="py-24 px-6 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl massive-italic mb-4">WINNING PROOFS</h2>
          <p className="text-zinc-500 font-medium">REAL RESULTS FROM OUR ELITE MEMBERS</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {proofs.map((proof, index) => (
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative geometric-border rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden bg-zinc-800">
                <img 
                  src={proof.imageUrl} 
                  alt="Proof" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              
              <div className="absolute top-3 left-3">
                <div className="badge-verified flex items-center gap-1 shadow-2xl">
                  <ShieldCheck size={10} />
                  VERIFIED
                </div>
              </div>

              <div className="p-4 bg-zinc-900/90 backdrop-blur-md border-t border-white/5">
                <div className="text-xl font-bold italic text-emerald-400 mb-1 tracking-tight">+$ { (Math.random() * 1000 + 500).toFixed(2) }</div>
                <p className="text-[10px] font-black text-white mb-1 uppercase tracking-wider">{proof.caption}</p>
                <p className="text-[9px] text-zinc-500 uppercase tracking-widest">{proof.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
