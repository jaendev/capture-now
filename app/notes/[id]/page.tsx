
export default async function NoteById({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log(id);
}