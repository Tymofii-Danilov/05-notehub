import css from "./SearchBox.module.css";

interface SearchBoxProps {
  findTasks: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ findTasks }: SearchBoxProps) {
  return (
    <input
      onChange={findTasks}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
