import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import "../styles.css"; 
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthService.login(username, password);
      setMessage("Đăng nhập thành công!");

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      if (res.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setMessage("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng nhập</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
