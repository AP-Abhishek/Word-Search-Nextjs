import AddNewWords from "./components/AddNewWords";

interface CreateCustomGameProps {
  params: Promise<{ difficulty: string }>;
}

export default async function CreateCustomGame({ params }: CreateCustomGameProps) {
  const { difficulty } = await params;
  return (
    <div>
      <AddNewWords difficulty={difficulty}/>
    </div>
  );
}