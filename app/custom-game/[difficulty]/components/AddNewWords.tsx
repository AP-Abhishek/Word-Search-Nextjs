"use client";
import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Type, Eraser, Settings2, AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface AddNewWordsProps {
  difficulty: string;
}

export default function AddNewWords({ difficulty }: AddNewWordsProps) {
  const [limit, setLimit] = useState<number>(0);
  const [word, setWord] = useState<string>("");
  const [newWords, setNewWords] = useState<string[]>([]);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [tempLimit, setTempLimit] = useState<string>("10");
  const [error, setError] = useState<string | null>(null);

  const handleSetCustomLimit = () => {
    const val = parseInt(tempLimit);
    if (!isNaN(val) && val > 0 && val <= 20) {
      setLimit(val);
      setShowLimitModal(false);
    }
  };

  const addNewWord = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const formattedWord = word.toUpperCase().trim();
    if (!formattedWord) return;
    if (newWords.includes(formattedWord)) {
      setError("Word already added!");
      return;
    }
    if (newWords.length >= limit) {
      setError("Limit reached!");
      return;
    }
    setNewWords((prev) => [...prev, formattedWord]);
    setWord("");
  };

  const removeWord = (index: number) => {
    setNewWords((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  const clearAll = () => {
    setNewWords([]);
    setError(null);
  };

  useEffect(() => {
    switch (difficulty) {
      case "easy": setLimit(6); break;
      case "medium": setLimit(10); break;
      case "hard": setLimit(15); break;
      case "custom": setShowLimitModal(true); break;
      default: setLimit(6);
    }
  }, [difficulty]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-2xl mx-auto p-2 md:p-6 relative">
      <div className="w-full flex justify-start mb-4">
        <Link href="/custom-game">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors text-xs font-black uppercase tracking-widest"
          >
            <ChevronLeft size={16} /> BACK
          </motion.button>
        </Link>
      </div>

      <motion.div
        layout
        className="w-full min-h-40 bg-white/60 backdrop-blur-xl rounded-4xl border border-white/80 p-6 mb-6 shadow-xl relative"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black uppercase tracking-wider text-slate-800">Word Queue</h3>
          <div className="flex items-center gap-4">
            {newWords.length > 0 && (
              <button onClick={clearAll} className="text-rose-500 hover:underline flex items-center gap-1 text-[10px] font-bold">
                <Eraser size={12} /> CLEAR ALL
              </button>
            )}
            <div className={`px-3 py-1 rounded-full text-[10px] font-black ${limit === newWords.length ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-600"}`}>
              {newWords.length} / {limit}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {newWords.length === 0 ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="text-slate-400 text-sm font-medium">
                Type words below to build your game...
              </motion.p>
            ) : (
              newWords.map((newWord, index) => (
                <motion.span
                  key={`${newWord}-${index}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl shadow-sm text-xs font-black tracking-wider text-slate-700 hover:border-pink-200 transition-colors"
                >
                  {newWord}
                  <button onClick={() => removeWord(index)} className="hover:text-rose-500 transition-colors">
                    <X size={14} strokeWidth={3} />
                  </button>
                </motion.span>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <form onSubmit={addNewWord} className="w-full flex flex-col gap-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Type className="w-5 h-5 text-slate-300 group-focus-within:text-pink-500 transition-colors" />
          </div>
          <input
            type="text"
            maxLength={20}
            disabled={newWords.length >= limit}
            placeholder={newWords.length >= limit ? "LIMIT REACHED" : "ENTER WORD"}
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
              if (error) setError(null);
            }}
            className={`w-full h-14 pl-12 pr-16 bg-white border-2 rounded-2xl outline-none focus:ring-4 transition-all text-sm font-bold tracking-[0.2em] placeholder:text-slate-300 disabled:bg-slate-50 ${error ? "border-red-400 focus:ring-red-50" : "border-slate-100 focus:border-pink-300 focus:ring-pink-50"
              }`}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={newWords.length >= limit}
            className="absolute right-2 top-2 h-10 px-4 bg-pink-500 rounded-xl flex items-center justify-center text-white text-[10px] font-black tracking-widest shadow-lg hover:bg-pink-600 transition-colors disabled:bg-slate-300"
          >
            ADD
          </motion.button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-red-500 text-[10px] font-bold px-2"
            >
              <AlertCircle size={14} /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          disabled={newWords.length === 0}
          className="w-full h-16 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl text-white font-black text-sm tracking-[0.3em] shadow-xl disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          <Sparkles size={18} className="animate-pulse" />
          CREATE GAME
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </motion.button>
      </form>

      <AnimatePresence>
        {showLimitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => difficulty !== 'custom' && setShowLimitModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl border border-slate-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-indigo-50 rounded-2xl mb-4">
                  <Settings2 className="w-8 h-8 text-indigo-500" />
                </div>
                <h2 className="text-xl font-black text-slate-800 mb-2">Word Limit</h2>
                <p className="text-sm text-slate-500 mb-6 font-medium">Set max words (Max 20)</p>
                <input
                  type="number" min="1" max="20" value={tempLimit}
                  onChange={(e) => setTempLimit(e.target.value)}
                  className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl text-center text-2xl font-black text-slate-700 outline-none mb-6"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSetCustomLimit}
                  className="w-full h-14 bg-indigo-500 text-white rounded-2xl font-black tracking-widest shadow-lg"
                >
                  SET LIMIT
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

