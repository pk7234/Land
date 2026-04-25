import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Lock, Image as ImageIcon, Plus, Trash2, Loader2, Upload } from 'lucide-react';
import { MarketData, Proof } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  markets: MarketData[];
  onUpdateMarkets: (markets: MarketData[]) => void;
  proofs: Proof[];
  onUpdateProofs: (proofs: Proof[]) => void;
}

export default function AdminPanel({ isOpen, onClose, markets, onUpdateMarkets, proofs, onUpdateProofs }: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [localMarkets, setLocalMarkets] = useState<MarketData[]>(markets);
  const [localProofs, setLocalProofs] = useState<Proof[]>(proofs);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '723424') {
      setIsAuthorized(true);
    } else {
      alert('Access Denied');
    }
  };

  const handleSave = () => {
    onUpdateMarkets(localMarkets);
    onUpdateProofs(localProofs);
    onClose();
  };

  const uploadImage = async (file: File): Promise<string> => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      }
      throw new Error('Upload failed');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please check your API key and connection.');
      return '';
    }
  };

  const handleMarketImageUpload = async (marketId: string, file: File) => {
    setIsUploading(`market-${marketId}`);
    const url = await uploadImage(file);
    if (url) {
      setLocalMarkets(prev => prev.map(m => m.id === marketId ? { ...m, imageUrl: url } : m));
    }
    setIsUploading(null);
  };

  const handleProofImageUpload = async (file: File) => {
    setIsUploading('new-proof');
    const url = await uploadImage(file);
    if (url) {
      const newProof: Proof = {
        id: Date.now().toString(),
        imageUrl: url,
        caption: 'New Payout',
        timestamp: 'Just now'
      };
      setLocalProofs(prev => [newProof, ...prev]);
    }
    setIsUploading(null);
  };

  const handleDeleteProof = (id: string) => {
    setLocalProofs(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-zinc-950/98 backdrop-blur-xl flex items-center justify-center p-6"
      >
        <div className="absolute top-6 right-6">
          <button onClick={onClose} className="p-2 hover:text-emerald-500 transition-colors"><X size={32} /></button>
        </div>

        {!isAuthorized ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-8 brutalist-border bg-zinc-900 rounded-2xl"
          >
            <div className="flex justify-center mb-6 text-emerald-500">
              <Lock size={48} />
            </div>
            <h2 className="text-3xl font-black italic text-center mb-8 tracking-tighter">ADMIN ACCESS</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full bg-black border-2 border-white/10 rounded-sm p-4 font-bold focus:border-emerald-500 outline-none transition-colors text-center"
              />
              <button className="w-full bg-emerald-500 text-black py-4 font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors">
                ENTER SYSTEM
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col bg-zinc-900 rounded-2xl brutalist-border"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
              <div>
                <h2 className="text-4xl font-black italic tracking-tighter">ELITE COMMAND</h2>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Logged in as Administrator</p>
              </div>
              <button 
                onClick={handleSave}
                className="bg-emerald-500 text-black px-8 py-3 font-black flex items-center gap-2 rounded-sm hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <Save size={20} />
                SAVE & PUBLISH
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
              {/* TOP MARKETS SECTION */}
              <section>
                <h3 className="text-2xl font-black italic mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded bg-emerald-500 text-black flex items-center justify-center text-sm not-italic">01</span>
                  TOP MARKETS (GREYHOUND & HORSE)
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {localMarkets.map((market) => (
                    <div key={market.id} className="p-6 bg-black rounded-xl border border-white/5 space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-500 font-black italic tracking-widest text-sm">{market.type}</span>
                        {isUploading === `market-${market.id}` && <Loader2 className="animate-spin text-emerald-500" size={20} />}
                      </div>

                      <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
                        {market.imageUrl ? (
                          <>
                            <img src={market.imageUrl} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                              <label className="flex flex-col items-center justify-center cursor-pointer">
                                <Upload size={24} className="text-emerald-500 mb-1" />
                                <span className="text-[10px] font-black uppercase">Change</span>
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*"
                                  onChange={(e) => e.target.files?.[0] && handleMarketImageUpload(market.id, e.target.files[0])}
                                />
                              </label>
                              <button 
                                onClick={() => setDeleteConfirm(`market-${market.id}`)}
                                className="flex flex-col items-center justify-center text-red-500"
                              >
                                <Trash2 size={24} className="mb-1" />
                                <span className="text-[10px] font-black uppercase">Clear</span>
                              </button>
                            </div>
                          </>
                        ) : (
                          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
                            <Plus size={32} className="text-zinc-700 mb-2" />
                            <span className="text-xs font-black text-zinc-500 uppercase">Upload Image</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => e.target.files?.[0] && handleMarketImageUpload(market.id, e.target.files[0])}
                            />
                          </label>
                        )}

                        {/* MARKET DELETE CONFIRMATION */}
                        <AnimatePresence>
                          {deleteConfirm === `market-${market.id}` && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-zinc-950/90 flex flex-col items-center justify-center p-4 z-10"
                            >
                              <p className="text-xs font-black italic mb-4 text-center">DELETE MARKET IMAGE?</p>
                              <div className="flex gap-3 w-full max-w-[200px]">
                                <button 
                                  onClick={() => {
                                    setLocalMarkets(prev => prev.map(m => m.id === market.id ? { ...m, imageUrl: '' } : m));
                                    setDeleteConfirm(null);
                                  }}
                                  className="flex-1 bg-white text-black py-2 text-xs font-black rounded-sm"
                                >
                                  YES
                                </button>
                                <button 
                                  onClick={() => setDeleteConfirm(null)}
                                  className="flex-1 bg-red-500 text-white py-2 text-xs font-black rounded-sm"
                                >
                                  NO
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="space-y-4">
                        <input 
                          value={market.title}
                          onChange={(e) => setLocalMarkets(prev => prev.map(m => m.id === market.id ? { ...m, title: e.target.value } : m))}
                          className="w-full bg-zinc-900 border border-white/10 p-3 rounded font-bold focus:border-emerald-500 outline-none"
                          placeholder="Title"
                        />
                        <textarea 
                          value={market.description}
                          onChange={(e) => setLocalMarkets(prev => prev.map(m => m.id === market.id ? { ...m, description: e.target.value } : m))}
                          className="w-full bg-zinc-900 border border-white/10 p-3 rounded text-sm text-zinc-400 outline-none h-24 resize-none focus:border-emerald-500"
                          placeholder="Description"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* BET SCREEN LIST SECTION */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black italic flex items-center gap-3">
                    <span className="w-8 h-8 rounded bg-emerald-500 text-black flex items-center justify-center text-sm not-italic">02</span>
                    BET SCREEN LIST (WINNING PROOFS)
                  </h3>
                  <label className={`flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded font-bold text-sm cursor-pointer transition-colors ${isUploading === 'new-proof' ? 'opacity-50 pointer-events-none' : ''}`}>
                    {isUploading === 'new-proof' ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                    UPLOAD PROOF
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleProofImageUpload(e.target.files[0])}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {localProofs.map((proof) => (
                    <div key={proof.id} className="relative group aspect-[3/4] bg-black rounded-lg overflow-hidden border border-white/10">
                      <img src={proof.imageUrl} alt="" className="w-full h-full object-cover" />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black flex flex-col justify-end p-3">
                        <input 
                          value={proof.caption}
                          onChange={(e) => setLocalProofs(prev => prev.map(p => p.id === proof.id ? { ...p, caption: e.target.value } : p))}
                          className="bg-transparent text-[10px] font-bold uppercase outline-none focus:text-emerald-500"
                        />
                      </div>

                      <button 
                        onClick={() => setDeleteConfirm(proof.id)}
                        className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full z-20 transition-all active:scale-90"
                      >
                        <Trash2 size={16} />
                      </button>

                      {/* DELETE CONFIRMATION OVERLAY */}
                      <AnimatePresence>
                        {deleteConfirm === proof.id && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-zinc-950/90 flex flex-col items-center justify-center p-2 z-10"
                          >
                            <p className="text-[10px] font-black italic mb-3 text-center">DELETE PROOF?</p>
                            <div className="flex gap-2 w-full">
                              <button 
                                onClick={() => handleDeleteProof(proof.id)}
                                className="flex-1 bg-white text-black py-1.5 text-[10px] font-black rounded-sm active:scale-95 transition-transform"
                              >
                                YES
                              </button>
                              <button 
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 bg-red-500 text-white py-1.5 text-[10px] font-black rounded-sm active:scale-95 transition-transform"
                              >
                                NO
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
