//: Libraries
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { toast, Toaster } from "react-hot-toast";

//: Components
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import { fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

//: APP Function
export default function App() {
  const perPage = 12;
  // const [id, setId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const debaucedSetSearchText = useDebouncedCallback(setSearchText, 300);

  const handleSearch = (value: string) => {
    setCurrentPage(1);
    debaucedSetSearchText(value);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, perPage, searchText],
    queryFn: () => fetchNotes(currentPage, perPage, searchText),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={searchText} onSearch={handleSearch} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            onPageChange={setCurrentPage}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>

        {isModalOpen && (
          <Modal>
            <NoteForm close={closeModal} />
          </Modal>
        )}
      </header>
      {isLoading && <strong>Завантаження</strong>}
      {isError && toast.error("Щось пішло не так!")}
      <Toaster />
      {data?.notes && <NoteList notes={data.notes} />}
    </div>
  );
}
