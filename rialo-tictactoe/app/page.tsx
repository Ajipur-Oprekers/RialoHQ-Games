"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateWinner, getComputerMove } from "../lib/gameUtils";
import UsernameForm from "../components/UsernameForm";
import Levels from "../components/Levels";
import GameBoard from "../components/GameBoard";
import Popup from "../components/Popup";
import BackgroundTexts from "../components/BackgroundTexts";
import Footer from "../components/Footer";

export default function Home() {
  const size = 5;
  const [loading, setLoading] = useState(true);
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [mode, setMode] = useState<"Easy" | "Medium" | "Hard" | null>(null);
  const [username, setUsername] = useState("");
  const [usernameSet, setUsernameSet] = useState(false);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const winner = calculateWinner(squares, size);
  const isBoardFull = squares.every((sq) => sq !== null);
  const isDraw = !winner && isBoardFull;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (winner) {
      setShowPopup(winner.player === "X"
        ? `Congratulations ${username}, You Win! 🎉`
        : "Computer Wins! Better luck next time.");
    } else if (isDraw) {
      setShowPopup("It's a Draw! 🤝");
    }
  }, [winner, isDraw, username]);

  function handleMouseMove(e: React.MouseEvent) {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 100;
    const y = (e.clientY / innerHeight) * 100;
    setPos({ x, y });
  }

  function handleClick(index: number) {
    if (squares[index] || winner || !isXNext || isDraw) return;
    const nextSquares = squares.slice();
    nextSquares[index] = "X";
    setSquares(nextSquares);
    setIsXNext(false);
  }

  function resetGame() {
    setSquares(Array(size * size).fill(null));
    setIsXNext(true);
    setShowPopup(null);
  }

  useEffect(() => {
    if (!isXNext && !winner && !isDraw && mode) {
      setTimeout(() => {
        const move = getComputerMove(squares, size, mode);
        if (move !== null) {
          const nextSquares = squares.slice();
          nextSquares[move] = "O";
          setSquares(nextSquares);
        }
        setIsXNext(true);
      }, 600);
    }
  }, [isXNext, squares, mode, winner, isDraw, size]);

  const bgStyle = {
    background: `radial-gradient(circle 32vmax at ${pos.x}% ${pos.y}%, #facc15 0%, #000 100%)`,
    transition: "background 0.15s ease",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <motion.h1
          className="text-4xl font-bold text-yellow-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.h1>
      </div>
    );
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      className="flex flex-col items-center justify-center min-h-screen text-yellow-200 p-4 relative bg-black overflow-hidden"
    >
      <div className="absolute inset-0" style={bgStyle} />

      <BackgroundTexts />

      <div className="relative z-20 flex flex-col items-center w-full">
        <AnimatePresence mode="wait">
          {!usernameSet && (
            <UsernameForm username={username} setUsername={setUsername} onSubmit={() => setUsernameSet(true)} />
          )}

          {usernameSet && !mode && <Levels setMode={setMode} />}

          {usernameSet && mode && (
            <GameBoard
              squares={squares}
              winner={winner}
              isXNext={isXNext}
              username={username}
               mode={mode!}
              handleClick={handleClick}
              resetGame={resetGame}
              setMode={setMode}
              setUsernameSet={setUsernameSet}
              setUsername={setUsername}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPopup && (
          <Popup
            showPopup={showPopup}
            onClose={() => {
              setShowPopup(null);
              resetGame();
              setMode(null);
            }}
          />
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
