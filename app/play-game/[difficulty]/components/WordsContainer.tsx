"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWords } from "./WordsContext";

export default function WordsContainer() {

  const { words, foundWords } = useWords();

  const [showQuitModal, setShowQuitModal] = useState(false);
  const router = useRouter();

  const handleQuit = () => {
    router.replace("/play-game");
  };

  useEffect(() => {
    const handlePopState = () => {
      router.replace("/play-game");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-100 flex flex-col p-4 md:p-6"
      >
        <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <img src="/favicon.ico" alt="logo" className="size-6 md:size-8 drop-shadow-md" />
              <h1 className="text-lg md:text-xl font-black text-slate-800 drop-shadow-sm">Word Search</h1>
            </div>
            <button
              onClick={() => setShowQuitModal(true)}
              className="text-[10px] md:text-xs font-black text-rose-500 hover:text-rose-700 transition-colors uppercase tracking-widest flex items-center gap-1 hover:cursor-pointer"
            >
              Quit Game
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3 md:mb-6">
          <div className="p-1.5 bg-pink-100 rounded-lg">
            <Search className="w-4 h-4 text-pink-600" strokeWidth={3} />
          </div>
          <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">Word List</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {words.map((word, index) => {
                const isFound = foundWords.includes(word);
                return (
                  <motion.div
                    key={`${word}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border text-[10px] md:text-xs font-black tracking-widest transition-all ${isFound
                        ? "bg-emerald-500 border-emerald-500 text-white line-through"
                        : "bg-white border-slate-200 text-slate-600 shadow-xs"
                      }`}
                  >
                    {word}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex justify-between items-center text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
            <span>Progress</span>
            <span>{foundWords.length}/{words.length}</span>
          </div>
          <div className="h-1.5 md:h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(foundWords.length / words.length) * 100}%` }}
              className="h-full bg-linear-to-r from-pink-500 to-rose-500"
            />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showQuitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setShowQuitModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-rose-50 rounded-2xl mb-4">
                  <AlertCircle className="w-8 h-8 text-rose-500" />
                </div>
                <h2 className="text-xl font-black text-slate-800 mb-2 tracking-tight">Quit Game?</h2>
                <p className="text-sm text-slate-500 mb-8 font-medium">
                  Your current progress will be lost. Are you sure you want to exit?
                </p>

                <div className="flex flex-col w-full gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleQuit}
                    className="w-full h-14 bg-rose-500 text-white rounded-2xl font-black tracking-widest shadow-lg shadow-rose-100 flex items-center justify-center gap-2 hover:cursor-pointer"
                  >
                    <LogOut size={18} /> YES, QUIT
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQuitModal(false)}
                    className="w-full h-14 bg-slate-100 text-slate-600 rounded-2xl font-black tracking-widest hover:cursor-pointer"
                  >
                    CONTINUE PLAYING
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

