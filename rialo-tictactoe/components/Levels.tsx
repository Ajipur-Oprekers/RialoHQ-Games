"use client";
import { motion } from "framer-motion";

type LevelsProps = {
  setMode: (mode: "Easy" | "Medium" | "Hard") => void;
};

export default function Levels({ setMode }: LevelsProps) {
  return (
    <motion.div
      key="levels"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col items-center"
    >
      <h1 className="text-3xl font-bold mb-6">Choose Levels</h1>
      <div className="flex flex-col gap-4">
        {["Easy", "Medium", "Hard"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m as any)}
            className="px-6 py-3 bg-yellow-200 text-black hover:bg-yellow-300 rounded-lg text-lg"
          >
            {m}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
