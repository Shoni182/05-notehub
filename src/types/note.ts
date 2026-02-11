// Загальні інтерфейси, які пов’язані з сутністю нотаток (Note, NoteTag) мають бути у файлі — src/types/note.ts.

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}
