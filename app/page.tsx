"use client";

import HomeMenu from "./components/HomeMenu";
import { motion } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any} }
};

export default function Home() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full h-full flex-center flex-col gap-8 sm:gap-10 md:gap-12 pb-16 sm:pb-20 md:pb-24 px-4"
    >
      <motion.div variants={itemVariants} className="text-center space-y-2 sm:space-y-3 md:space-y-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-pink-600 to-red-600 drop-shadow-lg">
          Welcome!
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-purple-700 drop-shadow-sm">
          Let&apos;s find some words!
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="w-full">
        <HomeMenu />
      </motion.div>
    </motion.div>
  );
}
