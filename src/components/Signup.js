/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import NoteContext from "../context/notes/NoteContext";

const Signup = () => {
  const context = useContext(NoteContext);
  const { userCreate, toggleAlert, refName, refPassword, refEmail } = context;
  const [signupDet, setSignupDet] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setSignupDet({ ...signupDet, [e.target.name]: e.target.value });
  };
  function emailValid(mail) {
    if (mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return true;
    } else {
      return false;
    }
  }

  const signupSubmit = (e) => {
    e.preventDefault();
    if (
      emailValid(signupDet.email) &&
      signupDet.name.length >= 3 &&
      signupDet.password.length >= 6
    ) {
      userCreate(signupDet.name, signupDet.email, signupDet.password);
    }
    if (signupDet.password.length < 6) {
      toggleAlert("Password must be at least 6 characters long", "error");
    }
    if (emailValid(signupDet.email) === false) {
      toggleAlert("Invalid email address", "error");
    }
    if (signupDet.name.length < 3) {
      toggleAlert("Name must be at least 3 characters long", "error");
    }
  };

  return (
    <div className="login-main-box">
      <div className="login-box">
        <IoMdLogIn className="login-icon" />
        <h2 className="login-title">Create a new account</h2>
        <p>Enter your deatils to create an account</p>
        <form onSubmit={signupSubmit} className="login-form">
          <label htmlFor="name">Enter your name</label>
          <input
            id="name"
            label={signupDet.name}
            onChange={onChange}
            autoComplete="name"
            type="name"
            ref={refName}
            name="name"
          />
          <label htmlFor="email">Enter your email adress</label>
          <input
            id="email"
            autoComplete="email"
            type="email"
            label={signupDet.email}
            ref={refEmail}
            onChange={onChange}
            name="email"
          />
          <label htmlFor="password">Create a strong password</label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            label={signupDet.password}
            ref={refPassword}
            onChange={onChange}
            name="password"
          />
          <div className="acc-info">
            <span>Already have an account?</span>
            <Link to="/login">Login Here</Link>
          </div>
          <button className="btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
