import { createPortal } from "react-dom";
import NoteForm from "../NoteForm/NoteForm";
import css from "./Modal.module.css";
import { useEffect } from "react";
import type { Note } from "../../types/note";

interface ModalProps {
  onClose: () => void;
  onAdd: (note: Note) => void;
  isPending: boolean;
}

export default function Modal({ onClose, onAdd, isPending }: ModalProps) {
  const handleBackDropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return createPortal(
    <div
      onClick={handleBackDropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <NoteForm onClose={onClose} onAdd={onAdd} isPending={isPending} />
      </div>
    </div>,
    document.body,
  );
}
