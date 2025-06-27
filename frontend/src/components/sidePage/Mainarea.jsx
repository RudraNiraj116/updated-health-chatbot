// src/components/sidePage/Mainarea.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatSection from "../chatPage/ChatSection";
import Checkup from "../checkupPage/Checkup";
import Reminders from "../reminderPage/Reminders";

const Mainarea = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("chat");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderSection = () => {
    switch (activeSection) {
      case "checkup":
        return <Checkup onBack={() => setActiveSection("chat")} />;
      case "reminders":
        return <Reminders onBack={() => setActiveSection("chat")} />;
      default:
        return (
          <ChatSection
            showSidebar={sidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        );
    }
  };

  return (
    <div className="d-flex" style={{ height: "100vh", width: "100%" }}>
      {sidebarOpen && (
        <div style={{ width: "300px", height: "100vh" }}>
          <Sidebar onToggle={toggleSidebar} onSelect={setActiveSection} />
        </div>
      )}
      <div className="flex-grow-1" style={{ height: "100vh", overflowY: "auto" }}>
        {renderSection()}
      </div>
    </div>
  );
};

export default Mainarea;
