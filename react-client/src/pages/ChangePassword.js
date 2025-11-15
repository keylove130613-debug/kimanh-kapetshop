import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "../styles2.css";

export default function ChangePassword() {
  const username = localStorage.getItem("username");
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordForm;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const res = await UserService.changePassword(username, oldPassword, newPassword);
      setMessage(res);
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      setMessage("Đổi mật khẩu thất bại, thử lại sau!");
    }
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <h3>Tài khoản của tôi</h3>
        <ul>
          <li onClick={() => navigate("/profile")}>Thông tin cá nhân</li>
          <li onClick={() => navigate("/my-orders")}>Đơn hàng của tôi</li>
          <li className="active">Đổi mật khẩu</li>
          <li onClick={() => navigate("/address")}>Địa chỉ giao hàng</li>
        </ul>
      </div>

      <div className="content">
        <h2>Đổi mật khẩu</h2>
        <div className="password-form">
          <input
            type="password"
            placeholder="Mật khẩu cũ"
            value={passwordForm.oldPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
            }
          />
          <button className="btn primary" onClick={handlePasswordChange}>
            Đổi mật khẩu
          </button>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}
