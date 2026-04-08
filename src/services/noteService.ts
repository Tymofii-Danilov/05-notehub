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
  const response = await axios.get<Response>(`/`, {
    params: {
      search: query,
      page,
      perPage,
    },
  });

  return response.data;
}

interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}

export async function createNote({ title, content, tag }: CreateNoteProps) {
  const response = await axios.post<Response>(`/`, { title, content, tag });
  return response.data;
}

interface DeleteNoteProps {
  id: string;
}

export async function deleteNote({ id }: DeleteNoteProps) {
  const response = await axios.delete<Response>(`/${id}`);
  return response.data;
}
