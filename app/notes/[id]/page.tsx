import CreateEditNoteView from "../new/page";

export default async function NoteById({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <CreateEditNoteView id={id} />
}