interface GenerateWordsProps {
  gridSize: number;
  wordLimit: number;
}

export default async function GenerateWords({
  gridSize,
  wordLimit,
}: GenerateWordsProps): Promise<string[]> {
  const res = await fetch(`https://random-word-api.herokuapp.com/word?number=200`);
  const data: string[] = await res.json();
  
  const uniqueWords = Array.from(new Set(data.map((w) => w.toUpperCase())));

  const longCandidates = uniqueWords.filter(
    (w) => w.length === gridSize || w.length === gridSize - 1
  );
  const shortCandidates = uniqueWords.filter(
    (w) => w.length >= 2 && w.length <= gridSize - 2
  );

  const result: string[] = [];

  if (longCandidates.length > 0) {
    const randomIdx = Math.floor(Math.random() * longCandidates.length);
    result.push(longCandidates[randomIdx]);
  }

  const shuffledShort = [...shortCandidates];
  for (let i = shuffledShort.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledShort[i], shuffledShort[j]] = [shuffledShort[j], shuffledShort[i]];
  }

  const needed = wordLimit - result.length;
  result.push(...shuffledShort.slice(0, needed));

  return result;
}