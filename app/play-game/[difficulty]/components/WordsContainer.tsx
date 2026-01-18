"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";

export default function WordsContainer() {
  const [words] = useState<string[]>(["APPLE", "BANANA", "MANGO", "ORANGE", "CHERRY", "GRAPE", "PEACH", "LEMON", "MELON", "KIWI", "BERRY"]);
  const [foundWords] = useState<string[]>(["APPLE", "PEACH"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-100 flex flex-col p-4 md:p-6"
    >
      {/* Game Header Section */}
      <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="favicon.ico" alt="logo" className="size-6 md:size-8 drop-shadow-md" />
            <h1 className="text-lg md:text-xl font-black text-slate-800 drop-shadow-sm">Word Search</h1>
          </div>
          <Link href="/play-game" className="text-[10px] md:text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest">
            ← Back
          </Link>
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
                  className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border text-[10px] md:text-xs font-black tracking-widest transition-all ${isFound ? "bg-emerald-500 border-emerald-500 text-white line-through" : "bg-white border-slate-200 text-slate-600 shadow-xs"
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
  );
}