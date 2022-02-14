/* eslint-disable no-unused-vars */
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useContext, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteCard = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote, toggleAlert} = context;
  const { title, description, _id, updateNote } = props;

  const deleteNoteBtn = () => {
    localStorage.setItem("id", _id)
    toggleAlert("Confirm Delete", "error", true, "delete", false)
  };

  return (
    (!(title.trim().length === 0) || !(description.trim().length === 0)) && (
      <div className="note-card">
        <div className="note-text" onClick={() => updateNote(props)}>
          <div className="note-title-box">
            <h3>{title}</h3>
          </div>
          <div className="note-desc-box">
            <p>{description}</p>
          </div>
        </div>
        <div className="note-btn-box">
          <MdOutlineEdit
            className="sm-icon"
            onClick={() => updateNote(props)}
          />
          <MdDeleteOutline className="sm-icon" onClick={deleteNoteBtn} />
        </div>
      </div>
    )
  );
};

NoteCard.defaultProps = {
  title: "",
  description: "",
};

export default NoteCard;