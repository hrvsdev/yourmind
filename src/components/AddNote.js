/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const textareaFunc = (e) => {
    e.target.style.height = "48px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const context = useContext(NoteContext);
  const { addNote, toggleAlert } = context;

  const [note, setNote] = useState({ title: "", description: "" });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if(!note.title.trim() && !note.description.trim()){
      toggleAlert("Enter something to save to mind")
    }else{
      addNote(note.title, note.description)
    }
    document.querySelector(".new-note-form input").value = "";
    document.querySelector(".new-note-form textarea").value = "";
    document.querySelector(".new-note-form textarea").style.height = "48px";
    setNote({ title: "", description: "" });
  };

  return (
    <>
      <div className="new-note-box">
        <form autoComplete="off" className="new-note-form">
          <input placeholder="Title" name="title" onChange={onChange} />
          <textarea
            spellCheck="false"
            onInput={textareaFunc}
            placeholder="What's on your mind ..."
            name="description"
            // required
            onChange={onChange}
          />
        </form>
        <button onClick={handleClick} className="btn note-btn">
          Save to Your Mind
        </button>
      </div>
    </>
  );
};

export default AddNote;
