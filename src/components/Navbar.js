/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { MdNoteAlt } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

const Navbar = () => {
  const context = useContext(NoteContext);
  const { tokenState, setTokenState, user, toggleAlert, alert} = context;
  const navigate = useNavigate();
  const logoutFunc = () => {
    toggleAlert("Are you sure to Logout?", "error", true, "logout", false);
  };

  return (
    <nav>
      <div className="left-sec">
        <Link to="/" className="main-icon-box">
          <MdNoteAlt className="main-icon" />
        </Link>
        <h1 className="icon-text">Your Mind - Your Thoughts</h1>
      </div>
      <div className="right-sec">
        <div className="nav-btn-box">
          {!tokenState ? (
            <>
              <Link to="/login" className="nav-btn btn">
                <span>Login</span>
              </Link>
              <Link to="/signup" className="nav-btn btn">
                <span>Sign Up</span>
              </Link>
            </>
          ) : (
            <>
              <span className="user-name">{user}</span>
              <IoMdLogOut
                title="Logout"
                onClick={logoutFunc}
                className="logout-icon sm-icon"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
