import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "../styles2.css";

export default function Profile() {
  const username = localStorage.getItem("username");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await UserService.getProfile(username);
      setUser(data);
      setForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    };
    fetchData();
  }, [username]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    const res = await UserService.updateProfile(username, form);
    setMessage(res);
    setEditing(false);
  };

  if (!user) return <p>Đang tải...</p>;

  return (
    <div className="profile-container">
      <div className="sidebar">
        <h3>Tài khoản của tôi</h3>
        <ul>
          <li className="active">Thông tin cá nhân</li>
          <li onClick={() => navigate("/my-orders")}>Đơn hàng của tôi</li>
          <li onClick={() => navigate("/change-password")}>Đổi mật khẩu</li> {/* chuyển trang */}
          <li onClick={() => navigate("/address")}>Địa chỉ giao hàng</li>
        </ul>
      </div>

      <div className="content">
        <h2>Thông tin cá nhân</h2>
        {!editing ? (
          <div className="info-view">
            <p><b>Họ tên:</b> {user.name}</p>
            <p><b>Tên đăng nhập:</b> {user.username}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Số điện thoại:</b> {user.phone}</p>
            <button className="btn primary" onClick={() => setEditing(true)}>Chỉnh sửa</button>
          </div>
        ) : (
          <div className="info-edit">
            <label>Họ và tên</label>
            <input name="name" value={form.name} onChange={handleChange} />
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} />
            <label>Số điện thoại</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
            <button className="btn primary" onClick={handleUpdate}>Lưu thay đổi</button>
          </div>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
