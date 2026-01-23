
interface GameCreationAlgorithmProps {
  gridSize: number;
  words: string[];
}

export default function GameCreationAlgorithm({ gridSize, words }: GameCreationAlgorithmProps): {
  grid: string[][],
  placedWords: string[]
} {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const grid = Array.from({length: gridSize}, () => new Array(gridSize).fill(null));
  const sortedWords = words.sort((a, b) => b.length - a.length);
  const finalWords = sortedWords.map(word => word.toUpperCase());
  const mappingPositions = [[1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, -1], [-1, 1], [1, -1]];

  const successfullyPlaced: string[] = [];

  for (const word of finalWords) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 500) {
      let direction = mappingPositions[Math.floor(Math.random() * mappingPositions.length)];

      let startX = Math.floor(Math.random() * gridSize);
      let startY = Math.floor(Math.random() * gridSize);

      let endX = startX + (word.length - 1) * direction[0];
      let endY = startY + (word.length - 1) * direction[1];
      
      if (endX >= 0 && endX < gridSize && endY >= 0 && endY < gridSize) {
        let canPlace = true;
        for (let i=0 ; i < word.length ; i++) {
          let currX = startX + (i * direction[0]);
          let currY = startY + (i * direction[1]);

          let existingLetter = grid[currY][currX];
          if (existingLetter !== null && existingLetter !== word[i]) {
            canPlace = false;
            break;
          }
        }
        if (canPlace) {
          for (let i=0 ; i < word.length ; i++) {
            grid[startY + (i * direction[1])][startX + (i * direction[0])] = word[i];
          }
          placed = true;
          successfullyPlaced.push(word);
        }
      }
      attempts++;
    }
  }

  return {
    grid: grid.map(row => 
      row.map(cell => cell || alphabets[Math.floor(Math.random() * alphabets.length)])
    ),
    placedWords: successfullyPlaced
  }
}
