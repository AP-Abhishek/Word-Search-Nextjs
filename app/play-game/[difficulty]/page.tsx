import GameBoard from "./components/GameBoard";
import GenerateWords from "./components/GenerateWords";
import WordsContainer from "./components/WordsContainer";
import { WordsProvider } from "./components/WordsContext";

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
    <div className="w-full h-screen flex flex-col md:flex-row items-stretch justify-center p-2 sm:p-4 md:p-6 lg:p-8 gap-2 sm:gap-4 md:gap-6 overflow-hidden">
      <WordsProvider initialGridSize={gridSize} initialWords={words}>
        <aside className="w-full landscape:w-1/2 sm:landscape:w-2/5 md:w-1/3 lg:w-96 shrink-0 grow-0 h-2/5 landscape:h-full md:h-full p-1">
          <WordsContainer />
        </aside>

        <main className="flex-1 w-full h-3/5 md:h-full relative">
          <GameBoard />
        </main>
      </WordsProvider>
    </div>
  );
}