import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/923197139789"
      onClick={(e) => e.stopPropagation()}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] border-4 border-zinc-950"
    >
      <MessageSquare size={28} fill="currentColor" />
    </motion.a>
  );
}
