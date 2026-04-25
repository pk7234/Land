import { Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onAdminClick: () => void;
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-[900] italic tracking-tighter">MAN PRO.</span>
        </motion.div>
      </div>
    </header>
  );
}
