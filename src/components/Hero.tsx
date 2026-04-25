import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="text-7xl md:text-8xl massive-italic mb-6">
            STOP GUESSING.<br />
            <span className="text-emerald-500 emerald-glow-text">WIN BIG.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-md mt-6 mb-12">
            Master the BetPro algorithms with our elite signal network. Technical analysis meets professional betting precision.
          </p>
          
          <div className="flex items-center gap-6">
            <motion.a
              href="https://wa.me/923197139789"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-lg font-[900] italic rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:bg-emerald-500 transition-colors"
            >
              GET TODAY'S SIGNALS
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
