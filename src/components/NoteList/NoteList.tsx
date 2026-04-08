import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onRemove: (id: number) => void;
  isDeleting: number | null;
}

export default function NoteList({
  notes,
  onRemove,
  isDeleting,
}: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li className={css.listItem} key={id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button onClick={() => id && onRemove(id)} className={css.button}>
              {isDeleting === id ? "Processing..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
