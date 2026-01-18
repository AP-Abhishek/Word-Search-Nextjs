"use client";

import Link from "next/link";
import { Gamepad2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const buttonVariants = {
  initial: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -4 },
  tap: { scale: 0.95 }
};

const iconVariants = {
  initial: { rotate: 0 },
  hover: { rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }
};

const shimmerVariants = {
  initial: { x: "-100%" },
  hover: { x: "100%", transition: { duration: 0.7, ease: "easeInOut" as any} }
};

export default function HomeMenu() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 items-center w-full px-4 sm:px-6">
      <Link href={"/play-game"} className="w-full max-w-sm">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="relative w-full h-16 sm:h-20 bg-linear-to-r from-pink-400 via-pink-500 to-rose-500 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
        >
          <motion.div
            variants={shimmerVariants}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
          />

          <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 h-full px-4">
            <motion.div variants={iconVariants}>
              <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
            </motion.div>
            <span className="text-xl sm:text-2xl text-white font-bold drop-shadow-lg">
              Play Game
            </span>
          </div>

          <div className="absolute top-2 right-4 w-2 h-2 sm:w-3 sm:h-3 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute bottom-3 right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="absolute top-4 left-6 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
        </motion.button>
      </Link>

      <Link href={"/custom-game"} className="w-full max-w-sm">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="relative w-full h-16 sm:h-20 bg-linear-to-r from-purple-400 via-purple-500 to-indigo-500 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
        >
          <motion.div
            variants={shimmerVariants}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
          />

          <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 h-full px-4">
            <motion.div variants={iconVariants}>
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
            </motion.div>
            <span className="text-xl sm:text-2xl text-white font-bold drop-shadow-lg">
              Create Game
            </span>
          </div>

          <div className="absolute top-2 right-4 w-2 h-2 sm:w-3 sm:h-3 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute bottom-3 right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="absolute top-4 left-6 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
        </motion.button>
      </Link>
    </div>
  );
}
