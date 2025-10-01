"use client";
import { motion } from "framer-motion";

export default function Popup({ showPopup, onClose }: any) {
  if (!showPopup) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-black text-yellow-200 p-6 rounded-lg shadow-lg text-center border-2 border-yellow-200 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4">{showPopup}</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-yellow-200 text-black rounded-lg hover:bg-yellow-300"
        >
          OK
        </button>
      </motion.div>
    </motion.div>
  );
}
