// import { useState } from "react";
import css from "./App.module.css";

// useDebouncedCallback;
// loader, message , errir -

export default function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонет NoteList  */}
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        <button className={css.button}>Create note +</button>
      </header>
    </div>
  );
}
