import { useState } from "react";
import "./Reminders.css";

const Reminders = ({ onBack }) => {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [reminders, setReminders] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addReminder = () => {
    if (task && time) {
      const newReminder = { task, time };
      if (editingIndex !== null) {
        const updated = [...reminders];
        updated[editingIndex] = newReminder;
        setReminders(updated);
        setEditingIndex(null);
      } else {
        setReminders([...reminders, newReminder]);
      }
      setTask("");
      setTime("");
    }
  };

  const deleteReminder = (index) => {
    const updated = reminders.filter((_, i) => i !== index);
    setReminders(updated);
  };

  const editReminder = (index) => {
    setTask(reminders[index].task);
    setTime(reminders[index].time);
    setEditingIndex(index);
  };

  return (
    <div className="reminder-container">
      <h2>🩺Health Reminders</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter reminder (e.g. Take pills)"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button className="submit-btn" onClick={addReminder}>
          {editingIndex !== null ? "Update" : "Add"}
        </button>
        <button className="back-btn" onClick={onBack}>← Back to Chat</button>
      </div>

      <ul className="reminder-list">
        {reminders.map((rem, index) => (
          <li key={index} className="reminder-item">
            <div>
              <strong>{rem.task}</strong> at <em>{rem.time}</em>
            </div>
            <div className="actions">
              <button onClick={() => editReminder(index)}>✏️</button>
              <button onClick={() => deleteReminder(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;
