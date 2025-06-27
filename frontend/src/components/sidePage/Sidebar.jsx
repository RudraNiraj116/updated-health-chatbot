import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faStethoscope, faBell } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ onToggle, onSelect }) => {
  return (
    <div className="sidebar">
      <button className="close-btn" onClick={onToggle}>
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <h2 className="sidebar-title">Health Assistant</h2>

      <div className="icon-group">
        <div className="icon-item" onClick={() => onSelect("checkup")}>
          <FontAwesomeIcon icon={faStethoscope} />
          <span>Checkup</span>
        </div>
        <div className="icon-item" onClick={() => onSelect("reminders")}>
          <FontAwesomeIcon icon={faBell} />
          <span>Reminders</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
