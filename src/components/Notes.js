/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState} from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteCard from "./NoteCard";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, userGet, toggleModal, progress, setProgress, loadingRef } =
    context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      getNotes();
      userGet();
    }
  }, []);

  const [note, setNote] = useState({ id: "", title: "", description: "" });
  const [noteData, setNoteData] = useState({
    id: "",
    title: "",
    description: "",
  });

  const updateNote = (n) => {
    setNote({ id: n._id, title: n.title, description: n.description });
    setNoteData({ id: n._id, title: n.title, description: n.description });
    toggleModal();
  };

  const noteText = notes.map((e) => (
    <NoteCard {...e} key={e._id} updateNote={updateNote} />
  ));
  return (
    <div className="notes-box">
      <Modal note={note} setNote={setNote} />
      {noteText}
    </div>
  );
};

export default Notes;
