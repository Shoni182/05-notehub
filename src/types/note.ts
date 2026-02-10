// Загальні інтерфейси, які пов’язані з сутністю нотаток (Note, NoteTag) мають бути у файлі — src/types/note.ts.

export interface Note {
  id: string;
  title: string;
  content: string;
  createAt: string;
  updateAt: string;
  tag: string;
}

export interface CreateNoteProp {
  title: string;
  content: string;
  tag: string;
}
