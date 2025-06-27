// src/components/chatPage/ChatArea.jsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./ChatArea.css";

const ChatArea = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <form className="chat-area" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="send-btn" aria-label="Send Message">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
};

export default ChatArea;
