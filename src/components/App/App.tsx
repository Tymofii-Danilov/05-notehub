import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import { useEffect, useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import { useDebouncedCallback } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes({ query, page, perPage: 8 }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const findTasks = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      setPage(1);
    },
    500,
  );

  useEffect(() => {
    if (isSuccess && data.notes.length === 0) {
      toast.error("No notes");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "loading-toast" });
    }
    return () => {
      toast.dismiss("loading-toast");
    };
  }, [isLoading]);

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox findTasks={findTasks} />
          {totalPages > 1 && (
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
        {!isLoading && isSuccess && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
