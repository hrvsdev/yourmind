/* eslint-disable no-useless-escape */
import { useState } from "react";
import NoteContext from "./NoteContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => { 
  const host = "https://yourmind.herokuapp.com";
  const [modal, setModal] = useState(false);
  const [progress, setProgress] = useState(0)
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertBtn, setAlertBtn] = useState(false);
  const [alertFunc, setAlertFunc] = useState("");
  const [alertFix, setAlertFix] = useState(false);
  const toggleAlert = (text, type, btn, func, fix) => {
    text ? setAlertText(text) : setAlertText("Normal Alert Text");
    type ? setAlertType(type) : setAlertType("error");
    setAlertBtn(btn);
    setAlertFunc(func);
    setAlertFix(fix);
    setAlert(!alert);
    !btn &&
      setTimeout(() => {
        setAlert(false);
      }, 1500);
  };

  const toggleModal = () => {
    setModal(!modal);
    alert && toggleAlert();
  };
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [tokenState, setTokenState] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const genRanHex = (size) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

  const navigate = useNavigate();
  const userLogin = async (email, password) => {
    setProgress(30)
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    localStorage.setItem("success", json);
    setProgress(100)
    if (json.success) {
      toggleAlert("Login Successful", "success");
      localStorage.setItem("token", json.authToken);
      setTokenState(localStorage.getItem("token"));
      navigate("/");
    } else {
      // toggleAlert("Invalid Details", "error");
      toggleAlert(json.error, "error")
    }
  };

  const userCreate = async (name, email, password) => {
    setProgress(30)
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    setProgress(100)
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      setTokenState(localStorage.getItem("token"));
      toggleAlert("Sign Up Successful", "success");
      navigate("/");
    } else {
      console.log("error");
      toggleAlert("Email already in use", "error");
    }
  };

  const userGet = async (name, email, password) => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUser(json.user.name);
  };

  const getNotes = async () => {
    setProgress(30)
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const fetchedNotes = await response.json();
    setNotes(fetchedNotes);
    setProgress(100)
  };

  /// Add new note function
  const addNote = async (title, description) => {
    await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    const note = {
      _id: genRanHex(12),
      title: title,
      description: description,
    };
    setNotes(notes.concat(note));
    getNotes();
  };

  /// Delete note function
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    getNotes()
  };

  const editNote = async (id, title, description) => {
    setProgress(30)
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    const newNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title, description };
      }
      return note;
    });
    setNotes((prev) => newNotes);
    setProgress(100)
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        modal,
        toggleModal,
        userLogin,
        userCreate,
        navigate,
        tokenState,
        setTokenState,
        userGet,
        user,
        alertText,
        alert,
        setAlertText,
        toggleAlert,
        alertType,
        alertBtn,
        alertFunc,
        alertFix,
        progress,
        setProgress
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
