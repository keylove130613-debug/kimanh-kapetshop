import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "../styles.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const res = await UserService.register(form);
      setMessage(res);
      if (res.includes("successful")) {
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (err) {
      setMessage("Đăng ký thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Họ và tên" value={form.name} onChange={handleChange} />
        <input name="username" placeholder="Tên đăng nhập" value={form.username} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} />
        <input type="password" name="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Xác nhận mật khẩu" value={form.confirmPassword} onChange={handleChange} />
        <button type="submit">Đăng ký</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
