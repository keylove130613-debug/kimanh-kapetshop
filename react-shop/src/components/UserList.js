import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";

export default function UserList({ onEdit }) {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await UserService.getAll();
      setUsers(res.data || res);
    } catch (err) {
      setError("Không thể tải danh sách người dùng!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa user này không?")) {
      try {
        await UserService.delete(id);
        setMessage("Xóa thành công!");
        loadUsers();
      } catch {
        setError("Lỗi khi xóa người dùng!");
      }
    }
  };

  return (
    <div className="container">
      <h2>Danh sách người dùng</h2>

      {error && <p className="error">{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên đăng nhập</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => onEdit && onEdit(u)}>Sửa</button>
                  <button onClick={() => handleDelete(u.id)}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Không có người dùng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
