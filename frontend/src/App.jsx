// App.jsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/NavbarPage/Navbar";
import Mainarea from "./components/sidePage/Mainarea";
import AuthForm from "./components/LoginPage/AuthForm";

const App = () => {
  const [user, setUser] = useState(null); // track logged-in user

  const handleLogout = () => {
    setUser(null); // clear user state
  };

  const ChatPage = () => (
    <div className="d-flex flex-column vh-100">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="flex-grow-1">
        <Mainarea />
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Redirect to login if not logged in */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth route */}
        <Route path="/login" element={<AuthForm setUser={setUser} />} />

        {/* Chat route (protected) */}
        <Route
          path="/chat"
          element={user ? <ChatPage /> : <Navigate to="/login" replace />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
