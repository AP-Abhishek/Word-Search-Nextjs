"use client";

import { motion } from "framer-motion";

const headerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const logoVariants = {
  initial: { rotate: 0, scale: 1 },
  hover: { rotate: 360, scale: 1.1, transition: { duration: 0.6 } }
};

const titleVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } }
};

export default function Header() {
  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className="h-24 sm:h-16 md:h-24 py-2 flex-center gap-3 sm:gap-6 md:gap-8 bg-linear-to-r from-purple-500 via-pink-500 to-red-500 shadow-2xl relative overflow-hidden px-4"
    >
      <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full -translate-x-12 sm:-translate-x-16 -translate-y-12 sm:-translate-y-16" />
      <div className="absolute bottom-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full translate-x-16 sm:translate-x-20 translate-y-16 sm:translate-y-20" />

      <motion.img
        variants={logoVariants}
        whileHover="hover"
        src="/favicon.ico"
        alt="logo"
        className="size-12 sm:size-14 md:size-16 drop-shadow-2xl relative z-10 cursor-pointer"
      />
      <motion.h1
        variants={titleVariants}
        whileHover="hover"
        className="text-3xl sm:text-4xl md:text-5xl text-white drop-shadow-lg relative z-10 cursor-default"
      >
        Word Search
      </motion.h1>
    </motion.header>
  );
}
