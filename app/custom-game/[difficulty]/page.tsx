interface CreateCustomGameProps {
  params: Promise<{ difficulty: string }>;
}

export default async function CreateCustomGame({ params }: CreateCustomGameProps) {
  const { difficulty } = await params;
  return (
    <>
      CREATE CUSTOM GAME
      {difficulty}
    </>
  );
}