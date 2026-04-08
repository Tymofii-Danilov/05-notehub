import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createNote, deleteNote, fetchNotes } from "../../services/NoteService";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import type { Note } from "../../types/note";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, error, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes({ query, page, perPage: 8 }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const postMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const addNote = (note: Note) => {
    postMutation.mutate({ note });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const removeNote = (id: number) => {
    deleteMutation.mutate({ id });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const findTasks = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setQuery(event.target.value),
    500,
  );

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox findTasks={findTasks} />
          {totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={(page) => setPage(page)}
            />
          )}
          <button onClick={openModal} className={css.button}>
            Create note +
          </button>
        </header>
        {isError && error.message}
        {isLoading && <p>Loading...</p>}
        {isSuccess && data.notes.length > 0 && (
          <NoteList notes={data.notes} onRemove={removeNote} />
        )}
        {isModalOpen && <Modal onClose={closeModal} onAdd={addNote} />}
      </div>
    </>
  );
}
