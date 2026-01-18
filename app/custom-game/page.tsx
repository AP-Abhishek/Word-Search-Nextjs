"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Grid2X2, Grid3X3, LayoutGrid, Settings2 } from "lucide-react";

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.03 },
  tap: { scale: 0.97 }
};

const shimmerVariants = {
  initial: { x: "-100%" },
  hover: { x: "100%", transition: { duration: 0.7, ease: "easeInOut" as any } }
};

const customOptions = [
  {
    name: "Easy",
    size: "8x8",
    href: "/custom-game/easy",
    icon: Grid2X2,
    color: "from-emerald-400 to-teal-500",
  },
  {
    name: "Medium",
    size: "12x12",
    href: "/custom-game/medium",
    icon: Grid3X3,
    color: "from-amber-400 to-orange-500",
  },
  {
    name: "Hard",
    size: "16x16",
    href: "/custom-game/hard",
    icon: LayoutGrid,
    color: "from-rose-400 to-red-500",
  },
  {
    name: "Custom",
    size: "Manual",
    href: "/custom-game/custom",
    icon: Settings2,
    color: "from-slate-500 to-slate-700",
  }
];

export default function CustomGame() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-sm mx-auto px-6 py-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Create Game
        </h1>
      </motion.div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {customOptions.map((opt) => (
          <Link key={opt.name} href={opt.href} className="w-full">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className={`relative w-full flex items-center md:flex-col md:justify-center bg-linear-to-br ${opt.color} rounded-2xl shadow-md overflow-hidden group p-3 md:aspect-square md:p-0 transition-all`}
            >
              <motion.div
                variants={shimmerVariants}
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
              />

              <div className="relative z-10 flex items-center md:flex-col gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <opt.icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>

                <div className="flex flex-col text-left md:text-center">
                  <span className="text-base text-white font-bold leading-none">
                    {opt.name}
                  </span>
                  <span className="text-white/80 text-xs font-medium mt-1">
                    {opt.size}
                  </span>
                </div>
              </div>
            </motion.button>
          </Link>
        ))}
      </section>

      <Link href="/" className="mt-6 text-slate-500 hover:text-slate-800 font-medium transition-colors text-xs uppercase tracking-widest">
        ← Back to Menu
      </Link>
    </div>
  );
}
