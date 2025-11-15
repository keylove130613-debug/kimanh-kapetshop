import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserService from "../services/UserService";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await UserService.login(form); 
localStorage.setItem("token", res.accessToken); // dùng accessToken đúng từ backend
localStorage.setItem("username", res.username);
localStorage.setItem("role", res.role);

    setMessage("Đăng nhập thành công!");
    setTimeout(() => navigate("/"), 1000);
  } catch (err) {
    setMessage("Sai tên đăng nhập hoặc mật khẩu!");
  }
};

  return (
    <div className="auth-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Đăng nhập</button>
      </form>

      {message && <p>{message}</p>}

      <p style={{ marginTop: "10px" }}>
        Chưa có tài khoản?{" "}
        <Link to="/register" style={{ color: "#007bff", textDecoration: "none" }}>
          Tạo tài khoản ngay
        </Link>
      </p>
    </div>
  );
}
