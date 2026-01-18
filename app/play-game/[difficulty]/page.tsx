import GameBoard from "./components/GameBoard";
import WordsContainer from "./components/WordsContainer";

interface PlayNewGameProps {
  params: Promise<{ difficulty: string }>;
}

export default async function PlayNewGame({ params }: PlayNewGameProps) {
  const { difficulty } = await params;

  return (
    <div className="w-full min-h-screen md:h-[85vh] flex flex-col md:flex-row items-center justify-center p-4 gap-4 md:gap-8">
      <aside className="w-full md:w-80 h-auto max-h-[30vh] md:max-h-full md:h-full">
        <WordsContainer />
      </aside>
      <main className="flex-1 w-full h-full flex items-center justify-center overflow-hidden">
        <GameBoard difficulty={difficulty} />
      </main>
    </div>
  );
}