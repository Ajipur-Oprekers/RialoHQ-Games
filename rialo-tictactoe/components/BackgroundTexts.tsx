"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function BackgroundTexts() {
  const texts = useMemo(() => {
    const words = ["RialoHQ", "Rethink", "Rebuild"];
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 80 + 5}%`,
      left: `${Math.random() * 80 + 5}%`,
      text: words[i % words.length],
    }));
  }, []);

  return (
    <>
      {texts.map((pos, idx) => (
        <motion.div
          key={pos.id}
          className="absolute z-10 pointer-events-none"
          style={{ top: pos.top, left: pos.left }}
          animate={{
            y: [0, idx % 2 === 0 ? -20 : 20, 0],
            x: [0, idx % 3 === 0 ? 20 : -20, 0],
          }}
          transition={{ duration: 3 + (idx % 3), repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-5xl font-bold text-black select-none opacity-50">
            {pos.text}
          </span>
        </motion.div>
      ))}
    </>
  );
}
