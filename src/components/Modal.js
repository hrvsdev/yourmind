/* eslint-disable no-unused-vars */
import { MdDeleteOutline, MdClose } from "react-icons/md";
import { useContext} from "react";
import NoteContext from "../context/notes/NoteContext";

const Modal = (props) => {
  const context = useContext(NoteContext);
  const { toggleModal, modal, editNote, deleteNote, toggleAlert} =
    context;
  const { note, setNote } = props;
  const modalDesc = document.querySelector(".modal-form textarea")
  const resizeFunc = () => {
    modalDesc.style.height = "auto";
    modalDesc.style.height = `${modalDesc.scrollHeight}px`;
  };

  const onDescChange = (e) => {
    setNote({ ...note, description: e.target.value });
    e.target.style.height = "48px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const onTitleChange = (e) => {
    setNote({ ...note, title: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.title, note.description);
    toggleModal();
  };
  const deleteNoteBtn = () => {
    localStorage.setItem("id", note.id);
    toggleAlert("Confirm Delete", "error", true, "delete", false);
  };

  return (
    <div
      className={`modal-main-box ${modal && "show-modal"}`}
      onClick={toggleModal}
      onTransitionEnd={resizeFunc}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-box">
          <form className="modal-form">
            <input
              placeholder="Title"
              value={note.title}
              name="edtitle"
              onChange={onTitleChange}
            />
            <textarea
              spellCheck="false"
              placeholder="What's on your mind ..."
              name="eddescription"
              value={note.description}
              onChange={onDescChange}
            />
          </form>
          <div className="modal-btn-box">
            <button className="btn modal-btn note-btn" onClick={handleClick}>
              Update Your Mind
            </button>
            <div className="modal-icon-box">
              <MdDeleteOutline className="sm-icon" onClick={deleteNoteBtn} />
              <MdClose className="sm-icon" onClick={toggleModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
