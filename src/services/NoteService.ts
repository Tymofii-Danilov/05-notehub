import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

interface Response {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesProps {
  query: string;
  page: number;
  perPage: number;
}

export async function fetchNotes({
  query,
  page,
  perPage,
}: FetchNotesProps): Promise<Response> {
  const response = await axios.get(`/`, {
    params: {
      search: query,
      page,
      perPage,
    },
  });

  return response.data;
}

interface CreateNoteProps {
  note: Note;
}

export async function createNote({ note }: CreateNoteProps) {
  const response = await axios.post(`/`, note);
  return response.data.notes;
}

interface DeleteNoteProps {
  id: number;
}

export async function deleteNote({ id }: DeleteNoteProps) {
  const response = await axios.delete(`/${id}`);
  return response.data.notes;
}
