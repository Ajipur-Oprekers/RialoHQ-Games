"use client";
import { motion } from "framer-motion";

type UsernameFormProps = {
  username: string;
  setUsername: (name: string) => void;
  onSubmit: () => void;
};

export default function UsernameForm({ username, setUsername, onSubmit }: UsernameFormProps) {
  return (
    <motion.div
      key="username"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col items-center"
    >
      <h1 className="text-3xl font-bold mb-6">Submit Username</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="px-4 py-2 rounded-lg mb-4 border-2 border-yellow-200 text-yellow-200 bg-transparent placeholder-yellow-400 focus:outline-none"
      />
      <button
        onClick={onSubmit}
        className="px-6 py-3 bg-yellow-200 text-black hover:bg-yellow-300 rounded-lg text-lg"
      >
        Start Games
      </button>
    </motion.div>
  );
}
