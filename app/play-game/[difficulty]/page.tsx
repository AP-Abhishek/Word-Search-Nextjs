import GameBoard from "./components/GameBoard";
import WordsContainer from "./components/WordsContainer";

interface PlayNewGameProps {
  params: Promise<{ difficulty: string }>;
}

export default async function PlayNewGame({ params }: PlayNewGameProps) {
  const { difficulty } = await params;

  return (
    <div className="w-full min-h-screen md:h-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-4 md:gap-8 overflow-hidden">

      <aside className="w-full md:w-80 shrink-0 max-h-[30vh] md:max-h-full">
        <WordsContainer />
      </aside>

      <main className="flex-1 h-full flex-center relative">
        <GameBoard difficulty={difficulty} />
      </main>

    </div>
  );
}