"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type GameBoardProps = {
  squares: string[];
  winner: { player: string; line: number[] } | null;
  isXNext: boolean;
  username: string;
  mode: "Easy" | "Medium" | "Hard";   // ✅ tambahin prop mode
  handleClick: (index: number) => void;
  resetGame: () => void;
  setMode: (mode: any) => void;
  setUsernameSet: (set: boolean) => void;
  setUsername: (u: string) => void;
};

export default function GameBoard({
  squares,
  winner,
  isXNext,
  username,
  mode,             // ✅ ambil mode
  handleClick,
  resetGame,
  setMode,
  setUsernameSet,
  setUsername,
}: GameBoardProps) {
  const size = Math.sqrt(squares.length);

  return (
    <motion.div
      key="gameplay"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col items-center"
    >
      {/* ✅ tampilkan mode yang dipilih */}
      <h1 className="text-3xl font-bold mb-6">{mode} Mode</h1>

      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {squares.map((value, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`w-16 h-16 text-xl font-bold flex items-center justify-center rounded-lg 
              border-2 border-yellow-200 text-yellow-200 bg-black bg-opacity-40 hover:bg-yellow-900 transition-colors
              ${winner?.line.includes(i) ? "bg-yellow-300 text-black" : ""}`}
          >
            {/* kalau X ganti logo, kalau O tetap huruf O */}
            {value === "X" ? (
              <Image
                src="/rialo.jpg"   // pastikan file ada di /public
                alt="Rialo Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            ) : (
              value
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 text-xl">
        {winner
          ? `Winner: ${winner.player === "X" ? username : "Computer"}`
          : `Turn: ${isXNext ? `${username} (X)` : "O (Computer)"}`}
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-yellow-200 text-black hover:bg-yellow-300 rounded-lg"
        >
          Reset Game
        </button>
        <button
          onClick={() => {
            resetGame();
            setMode(null);
            setUsernameSet(false);
            setUsername("");
          }}
          className="px-4 py-2 bg-yellow-200 text-black hover:bg-yellow-300 rounded-lg"
        >
          Switch Levels
        </button>
      </div>
    </motion.div>
  );
}
