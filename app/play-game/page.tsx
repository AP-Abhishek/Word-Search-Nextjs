"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Flame, Skull } from "lucide-react";
import { useEffect } from "react";

const buttonVariants = {
  initial: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -4 },
  tap: { scale: 0.95 }
};

const shimmerVariants = {
  initial: { x: "-100%" },
  hover: { x: "100%", transition: { duration: 0.7, ease: "easeInOut" as any } }
};

const difficulties = [
  {
    name: "Easy",
    href: "/play-game/easy",
    icon: Zap,
    color: "from-green-400 via-emerald-500 to-teal-500",
    delay: "0s"
  },
  {
    name: "Medium",
    href: "/play-game/medium",
    icon: Flame,
    color: "from-orange-400 via-orange-500 to-red-500",
    delay: "0.2s"
  },
  {
    name: "Hard",
    href: "/play-game/hard",
    icon: Skull,
    color: "from-slate-700 via-slate-800 to-slate-900",
    delay: "0.4s"
  }
];

export default function PlayGame() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-sm mx-auto px-6 py-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Select Difficulty
        </h1>
      </motion.div>

      <section className="flex flex-col gap-5 w-full max-w-sm">
        {difficulties.map((diff) => (
          <Link key={diff.name} href={diff.href} className="w-full">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className={`relative w-full h-16 sm:h-20 bg-linear-to-r ${diff.color} rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group`}
            >
              <motion.div
                variants={shimmerVariants}
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
              />

              <div className="relative z-10 flex items-center justify-between px-8 h-full">
                <span className="text-xl sm:text-2xl text-white font-bold drop-shadow-md">
                  {diff.name}
                </span>
                <diff.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white/90" />
              </div>

              <div
                className="absolute top-2 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse"
                style={{ animationDelay: diff.delay }}
              />
              <div
                className="absolute bottom-3 left-10 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse"
                style={{ animationDelay: diff.delay }}
              />
            </motion.button>
          </Link>
        ))}
      </section>

      <Link href="/" className="mt-6 text-slate-500 hover:text-slate-800 font-semibold transition-colors text-sm sm:text-base uppercase tracking-widest">
        ← Back to Menu
      </Link>
    </div>
  );
}
