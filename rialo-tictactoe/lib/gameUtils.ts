export function generateWinningCombos(n: number) {
  const combos: number[][] = [];
  for (let r = 0; r < n; r++) combos.push(Array.from({ length: n }, (_, i) => r * n + i));
  for (let c = 0; c < n; c++) combos.push(Array.from({ length: n }, (_, i) => i * n + c));
  combos.push(Array.from({ length: n }, (_, i) => i * n + i));
  combos.push(Array.from({ length: n }, (_, i) => i * n + (n - 1 - i)));
  return combos;
}

export function calculateWinner(squares: string[], size: number) {
  const winningCombos = generateWinningCombos(size);
  for (let combo of winningCombos) {
    const first = squares[combo[0]];
    if (first && combo.every((i) => squares[i] === first)) {
      return { player: first, line: combo };
    }
  }
  return null;
}

export function getComputerMove(
  squares: string[],
  size: number,
  mode: "Easy" | "Medium" | "Hard"
) {
  const emptyIndices = squares.map((v, i) => (v ? null : i)).filter((v) => v !== null) as number[];
  if (emptyIndices.length === 0) return null;

  if (mode === "Easy") {
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  if (mode === "Medium") {
    for (let i of emptyIndices) {
      const testSquares = squares.slice();
      testSquares[i] = "O";
      if (calculateWinner(testSquares, size)?.player === "O") return i;
    }
    for (let i of emptyIndices) {
      const testSquares = squares.slice();
      testSquares[i] = "X";
      if (calculateWinner(testSquares, size)?.player === "X") return i;
    }
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  if (mode === "Hard") {
    for (let i of emptyIndices) {
      const testSquares = squares.slice();
      testSquares[i] = "O";
      if (calculateWinner(testSquares, size)?.player === "O") return i;
    }
    for (let i of emptyIndices) {
      const testSquares = squares.slice();
      testSquares[i] = "X";
      if (calculateWinner(testSquares, size)?.player === "X") return i;
    }
    const center = Math.floor((size * size) / 2);
    if (emptyIndices.includes(center)) return center;
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  return null;
}
