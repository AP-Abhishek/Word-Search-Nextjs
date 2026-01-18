
interface GameCreationAlgorithmProps {
  gridSize: number;
  words: string[];
}

export default function GameCreationAlgorithm({ gridSize, words }: GameCreationAlgorithmProps): string[][] {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const grid = Array.from({length: gridSize}, () => new Array(gridSize).fill(null));
  const sortedWords = words.sort((a, b) => b.length - a.length);
  const mappingPositions = [[1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, -1]];

  for (const word of sortedWords) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 100) {
      let direction = mappingPositions[Math.floor(Math.random() * mappingPositions.length)];

      let startX = Math.floor(Math.random() * gridSize - 1);
      let startY = Math.floor(Math.random() * gridSize - 1);

      let endX = startX + (word.length - 1) * direction[0];
      let endY = startY + (word.length - 1) * direction[1];
      
      if (endX >= 0 && endX < gridSize && endY >= 0 && endY < gridSize) {
        let canPlace = true;
        for (let i=0 ; i < word.length ; i++) {
          let currX = startX + (i * direction[0]);
          let currY = startY + (i * direction[1]);

          let existingLetter = grid[currX][currY];
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
        }
      }
      attempts++;
    }
    
    for (let col of grid) {
      for (let cell of col) {
        if (cell == null) {
          cell = alphabets[Math.floor(Math.random() * alphabets.length)];
        }
      }
    }
  }
  
  return grid;
}
