import React, { useState } from "react";
import "../styles.css";
import UserService from "../services/UserService";

export default function UserForm({ onSave }) {
  const [user, setUser] = useState({ username: "", password: "", role: "USER" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.username.trim() || !user.password.trim()) {
      setMessage("Vui lòng nhập đầy đủ username và password!");
      return;
    }

    try {
      await UserService.register(user);
      setMessage("Đăng ký người dùng thành công!");
      setUser({ username: "", password: "", role: "USER" });
      onSave();
    } catch (err) {
      setMessage("Lỗi khi đăng ký người dùng!");
    }
  };

  return (
    <div className="category-form">
      <h3>Thêm người dùng mới</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <select
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit">Thêm</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
