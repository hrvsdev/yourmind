import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import LoadingBar from "react-top-loading-bar";
import { useContext } from "react";
import NoteContext from "./context/notes/NoteContext";

export default function App() {
  const context = useContext(NoteContext);
  return (
    <>
      <LoadingBar progress={context.progress} color="black" height={3} />
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
