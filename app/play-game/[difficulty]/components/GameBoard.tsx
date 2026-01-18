"use client";
import { motion, AnimatePresence } from "framer-motion";

interface GameBoardProps {
  difficulty: string;
}

export default function GameBoard({ difficulty }: GameBoardProps) {
  let gridSize: number;
  switch (difficulty) {
    case 'easy': gridSize = 8; break;
    case 'medium': gridSize = 12; break;
    case 'hard': gridSize = 16; break;
    default: gridSize = 12;
  }

  const boardCells = Array.from({ length: gridSize * gridSize }, (_, i) => ({
    id: i,
    char: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    found: Math.random() > 0.8,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-2 md:p-4 w-full h-full flex items-center justify-center"
    >
      <div
        className="grid gap-1 bg-slate-200/50 p-1.5 rounded-xl shadow-inner max-w-full max-h-full"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        <AnimatePresence>
          {boardCells.map((cell) => (
            <motion.div
              key={cell.id}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              whileTap={{ scale: 0.95 }}
              className={`
                size-10 md:size-16
                flex items-center justify-center 
                text-[10px] sm:text-sm md:text-base font-black uppercase 
                rounded-md cursor-pointer transition-all
                ${cell.found
                  ? 'bg-emerald-400 text-white shadow-md'
                  : 'bg-white text-slate-700 shadow-sm hover:bg-pink-50'
                }
              `}
            >
              {cell.char}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}