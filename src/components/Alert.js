/* eslint-disable no-unused-vars */
import React from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { useContext, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

const Alert = (props) => {
  const context = useContext(NoteContext);
  const { noteData, setNoteData } = props;
  let navigate = useNavigate();
  const {
    setTokenState,
    modal,
    alertText,
    alert,
    toggleAlert,
    alertType,
    alertBtn,
    deleteNote,
    alertFix,
    alertFunc,
    toggleModal,
    setProgress
  } = context;

  const deleteNoteData = () => {
    deleteNote(localStorage.getItem("id"));
    toggleAlert("Confirm Delete", "error", true, "delete", false);
    modal && toggleModal();
  };
  const logoutFunc = () => {
    localStorage.removeItem("token");
    setTokenState(null);
    navigate("/login");
    toggleAlert("Confirm Logout", "error", true, "logout", false);
  };

  return (
    <div
      className={`alert-main-box ${alert && "show-alert"} ${
        alertFix && "fix-alert"
      }`}
    >
      <div className={`alert alert-${alertType} anim`}>
        <div className="text">{alertText}</div>
        <div className="alert-btn-box">
          {alertBtn && alertFunc === "delete" && (
            <MdCheck onClick={deleteNoteData} className="sm-icon" />
          )}
          {alertBtn && alertFunc === "logout" && (
            <MdCheck onClick={logoutFunc} className="sm-icon" />
          )}
          {alertBtn && alertFunc === "update" && (
            <MdCheck className="sm-icon" />
          )}
          <MdClose
            className="sm-icon"
            onClick={() => {
              toggleAlert();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Alert;
