import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import App from './App';

ReactDOM.render(
  <BrowserRouter>
  <NoteState>
    <App />
    </NoteState>
  </BrowserRouter>,
  document.getElementById('root')
);