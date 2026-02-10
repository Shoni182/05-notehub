import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, FormikHelpers} from "formik";

// Formik
// Yup

interface NoteFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

interface NoteFormValues{
  title: string;
  content: string;
  tag: string; 
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "",
}


export default function NoteForm({ onClose, onSuccess }: NoteFormProps) {
  
  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    actions.resetForm()
  }
  
  return (
    <Formik initialValues={initialValues} onSubmit={}>
    <Form className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" className={css.input} />
        <span name="title" className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
        <span name="content" className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span name="tag" className={css.error} />
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClose}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled=false
          onClick={createNote}
        >
          Create note
        </button>
      </div>
      </Form>
      </Formik>
  );
}
