import GameBoard from "./components/GameBoard";
import GenerateWords from "./components/GenerateWords";
import WordsContainer from "./components/WordsContainer";

interface PlayNewGameProps {
  params: Promise<{ difficulty: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PlayNewGame({ params, searchParams }: PlayNewGameProps) {
  
  const { difficulty } = await params;
  const sParams = await searchParams;
  
  const rawWords = sParams.words as string | undefined;
  let words = rawWords ? decodeURIComponent(rawWords).split(",") : [];
  
  const rawGridSize = sParams["grid-size"] as string | undefined;
  const urlGridSize = rawGridSize ? Number(decodeURIComponent(rawGridSize)) : 0;
  
  let gridSize: number;
  let wordLimit: number;
  switch (difficulty) {
    case "easy":
      gridSize = 8;
      wordLimit = 6;
      break;
    case "medium":
      gridSize = 12;
      wordLimit = 10;
      break;
    case "hard":
      gridSize = 16;
      wordLimit = 14;
      break;
    case "custom":
      gridSize = urlGridSize;
      wordLimit = words.length;
      break;
    default:
      gridSize = 8;
      wordLimit = 6;
  }

  if (words.length === 0) {
    words = await GenerateWords({ gridSize: gridSize, wordLimit: wordLimit });
  }

  return (
    <div className="w-full min-h-screen md:h-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-4 md:gap-8 overflow-hidden">

      <aside className="w-full md:w-80 shrink-0 max-h-[30vh] md:max-h-full">
        <WordsContainer words={words} />
      </aside>

      <main className="flex-1 h-full flex-center relative">
        <GameBoard gridSize={gridSize} words={words} />
      </main>

    </div>
  );
}