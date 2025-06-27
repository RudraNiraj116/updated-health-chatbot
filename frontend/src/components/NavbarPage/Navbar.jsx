import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-3">
      <div className="container d-flex justify-content-between align-items-center w-100">
        <a className="navbar-brand fw-bold text-white" href="#">
          <FontAwesomeIcon icon={faRobot} className="me-2" />
          Health Chatbot
        </a>

        <div className="user-dropdown d-flex align-items-center gap-2" ref={dropdownRef}>
          <span className="text-white fw-semibold">{user?.name}</span>

          <div
            className="user-avatar"
            onClick={() => setMenuOpen(!menuOpen)}
            title="User menu"
          >
            {getInitials(user?.name)}
          </div>

          {menuOpen && (
            <div className="dropdown-menu show">
              <button className="dropdown-item" onClick={onLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
