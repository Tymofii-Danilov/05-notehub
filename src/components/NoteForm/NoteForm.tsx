import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import type { Note } from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
  onAdd: (note: Note) => void;
}

const NoteFormSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required("required"),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required(),
});

export default function NoteForm({ onClose, onAdd }: NoteFormProps) {
  return (
    <Formik<Note>
      initialValues={{
        title: "",
        content: "",
        tag: "Todo",
      }}
      validationSchema={NoteFormSchema}
      onSubmit={(values, formikHelpers) => {
        onAdd(values);
        formikHelpers.resetForm();
      }}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
