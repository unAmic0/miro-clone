const MINI_SQUARE_SIZE = 8;
const HALF_MINI_SQUARE_SIZE = MINI_SQUARE_SIZE / 2;

const getPointer = (row: number, col: number) => {
  const yDirection = row === 0 ? "n" : row === 2 ? "s" : "";
  const xDirection = col === 0 ? "w" : col === 2 ? "e" : "";

  return `${yDirection}${xDirection}-resize`;
};

const getMiniSquarePos = (index: number, position: number, bound: number) => {
  if (index === 0) return position - HALF_MINI_SQUARE_SIZE;
  else if (index === 1) return position + bound / 2 - HALF_MINI_SQUARE_SIZE;
  else if (index === 2) return position + bound - HALF_MINI_SQUARE_SIZE;
  return;
};

export const getMiniSquares = ({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  const miniSquares = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (row === 1 && col === 1) {
        continue;
      }
      miniSquares.push({
        x: getMiniSquarePos(col, x, width),
        y: getMiniSquarePos(row, y, height),
        width: MINI_SQUARE_SIZE,
        height: MINI_SQUARE_SIZE,
        pointer: getPointer(row, col),
      });
    }
  }

  return miniSquares;
};
