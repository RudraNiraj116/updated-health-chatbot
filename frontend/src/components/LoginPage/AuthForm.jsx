import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

const AuthForm = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", name: "" }); // reset form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          // After login, set user and go to chat
          setUser({ name: data.name, email: data.email });
          navigate("/chat");
        } else {
          // After signup, switch to login
          alert("Signup successful. Please login.");
          setIsLogin(true);
          setFormData({ email: "", password: "", name: "" }); // clear form
        }
      } else {
        alert(data.message || "Authentication failed.");
      }
    } catch (error) {
      alert(`An error occurred. Please try again. Error: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={toggleMode}
            style={{ color: "blue", cursor: "pointer" }}
          >
            {isLogin ? "Sign up here" : "Login here"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;