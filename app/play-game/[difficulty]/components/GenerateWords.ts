interface GenerateWordsProps {
  gridSize: number;
  wordLimit: number;
}

export default async function GenerateWords({
  gridSize,
  wordLimit,
}: GenerateWordsProps) {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=100`,
  );
  const data = await res.json();

  const candidateWords: string[] = data.filter(
    (word: string) => word.length <= gridSize,
  );
  let shortlistedWords: string[] = [];
  while (shortlistedWords.length !== wordLimit) {
    const newWord: string = candidateWords[Math.floor(Math.random() * candidateWords.length)];
    if (!shortlistedWords.find(word => word === newWord)) {
      shortlistedWords.push(newWord);
    }
  }
  return shortlistedWords;
}
