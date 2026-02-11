// fetchNotes : має виконувати запит для отримання колекції нотаток із сервера. Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);

// createNote: має виконувати запит для створення нової нотатки на сервері. Приймає вміст нової нотатки та повертає створену нотатку у відповіді;

// deleteNote: має виконувати запит для видалення нотатки за заданим ідентифікатором. Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.

// Інтерфейси, які описують відповіді http-запитів (FetchNotesResponse і т.д.) та параметри функцій, які виконують http-запити у — src/services/noteService.ts.

// imports
import axios from "axios";

// interface
import { type Note } from "../types/note";
import { type NewNote } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Key
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  page: number,
  perPage: number,
  searchText: string,
) => {
  const res = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search: searchText,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return res.data;
};

export const createNote = async (taskData: NewNote) => {
  const res = await axios.post<Note>("/notes", taskData, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

export const deleteNote = async (taskId: string) => {
  const res = await axios.delete<Note>(`/notes/${taskId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};
