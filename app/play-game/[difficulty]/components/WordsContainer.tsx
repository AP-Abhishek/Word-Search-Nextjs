"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle, LogOut, RotateCcw, Settings, PlusCircle, Home, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWords } from "./WordsContext";

export default function WordsContainer() {

  const { words, foundWords } = useWords();

  const [showQuitModal, setShowQuitModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const router = useRouter();

  const isGameWon = words.length > 0 && foundWords.length === words.length;

  useEffect(() => {
    if (isGameWon) {
      const timer = setTimeout(() => setShowWinModal(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isGameWon]);

  const handleQuit = () => router.replace("/play-game");
  const handlePlayAgain = () => window.location.reload();
  const handleChangeDifficulty = () => router.replace("/play-game");
  const handleCustomGame = () => router.replace("/custom-game");
  const handleHome = () => router.replace("/");

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
              className="text-[10px] md:text-xs font-black text-rose-500 hover:text-rose-700 transition-colors uppercase tracking-widest flex items-center gap-1 hover:cursor-pointer hover:underline"
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
                    className={`px-3 py-2 md:px-4 md:py-2.5 rounded-full border text-sm md:text-base font-black tracking-widest transition-all ${isFound
                      ? "bg-emerald-500 border-emerald-500 text-white line-through"
                      : "bg-white border-slate-200 text-slate-700 shadow-xs"
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
        {showWinModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-emerald-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-emerald-100 text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-flex p-4 bg-emerald-100 rounded-full mb-4"
              >
                <Trophy className="w-12 h-12 text-emerald-600" />
              </motion.div>

              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mb-2 tracking-tight">YOU WON!</h2>
              <p className="text-sm md:text-base text-slate-500 font-medium mb-8">Amazing job! You found all words.</p>

              <div className="grid grid-cols-1 gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayAgain} 
                  className="flex items-center justify-center gap-3 w-full h-14 bg-emerald-500 text-white rounded-2xl font-black tracking-widest shadow-lg shadow-emerald-100 hover:cursor-pointer hover:shadow-emerald-200 transition-shadow"
                >
                  <RotateCcw size={18} /> PLAY AGAIN
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleChangeDifficulty} 
                  className="flex items-center justify-center gap-3 w-full h-14 bg-blue-500 text-white rounded-2xl font-black tracking-widest shadow-lg shadow-blue-100 hover:cursor-pointer hover:shadow-blue-200 transition-shadow"
                >
                  <Settings size={18} /> NEW DIFFICULTY
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCustomGame} 
                  className="flex items-center justify-center gap-3 w-full h-14 bg-purple-500 text-white rounded-2xl font-black tracking-widest shadow-lg shadow-purple-100 hover:cursor-pointer hover:shadow-purple-200 transition-shadow"
                >
                  <PlusCircle size={18} /> CUSTOM GAME
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleHome} 
                  className="flex items-center justify-center gap-3 w-full h-14 bg-slate-100 text-slate-600 rounded-2xl font-black tracking-widest hover:cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  <Home size={18} /> HOME
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="p-4 bg-rose-50 rounded-2xl mb-4"
                >
                  <AlertCircle className="w-8 h-8 text-rose-500" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl md:text-3xl font-black text-slate-800 mb-2 tracking-tight"
                >
                  Quit Game?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-slate-500 mb-8 font-medium"
                >
                  Your current progress will be lost. Are you sure you want to exit?
                </motion.p>

                <div className="flex flex-col w-full gap-3">
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleQuit}
                    className="w-full h-14 bg-rose-500 text-white rounded-2xl font-black tracking-widest shadow-lg shadow-rose-100 flex items-center justify-center gap-2 hover:cursor-pointer hover:shadow-rose-200 transition-shadow"
                  >
                    <LogOut size={18} /> YES, QUIT
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowQuitModal(false)}
                    className="w-full h-14 bg-slate-100 text-slate-600 rounded-2xl font-black tracking-widest hover:cursor-pointer hover:bg-slate-200 transition-colors"
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

