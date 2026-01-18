interface PlayNewGameProps {
  params: Promise<{ difficulty: string }>;
}

export default async function PlayNewGame({ params }: PlayNewGameProps) {

  const { difficulty } = await params;

  return (
    <>
      PLAY NEW GAME
      {difficulty}
    </>
  );
}