/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import NoteContext from "../context/notes/NoteContext";

const Login = () => {
  const context = useContext(NoteContext);
  const { userLogin, loginScs, toggleAlert, setProgress } = context;
  const [loginDet, setLoginDet] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setLoginDet({ ...loginDet, [e.target.name]: e.target.value });
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    if (emailValid(loginDet.email)) {
      userLogin(loginDet.email, loginDet.password);
      !loginDet.email.trim() &&
        toggleAlert("Email address can't be empty", "error");
      !loginDet.password.trim() && toggleAlert("Invalid password", "error");
      !loginDet.email.trim() &&
        !loginDet.password.trim() &&
        toggleAlert("Email and password are empty", "error");
    } else {
      toggleAlert("Enter correct email address", "error");
    }
  };

  function emailValid(mail) {
    if (mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="login-main-box">
      <div className="login-box">
        <IoMdLogIn className="login-icon" />
        <h2 className="login-title">Login to continue</h2>
        <p>Use your account for details</p>
        <form onSubmit={loginSubmit} className="login-form">
          <label htmlFor="email">Enter your email adress</label>
          <input
            type="email"
            required
            id="email"
            label={loginDet.email}
            onChange={onChange}
            autoComplete="email"
            name="email"
          />
          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            id="password"
            required
            minLength={6}
            autoComplete="current-password"
            label={loginDet.password}
            onChange={onChange}
            name="password"
          />
          <div className="acc-info">
            <span>Don't have an account?</span>
            <Link to="/signup">Create Here</Link>
          </div>
          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
