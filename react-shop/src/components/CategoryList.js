import React, { useEffect, useState } from "react";
import CategoryService from "../services/CategoryService";
import "../styles2.css";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: null, name: "", parentId: null });
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await CategoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError("Không thể tải danh mục!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này không?")) {
      try {
        await CategoryService.delete(id);
        setCategories(categories.filter((c) => c.id !== id));
        setMessage("Đã xóa danh mục thành công!");
      } catch (err) {
        setError("Lỗi khi xóa danh mục!");
      }
    }
  };

  const handleEdit = (category) => {
    setForm({
      id: category.id,
      name: category.name,
      parentId: category.parentId || null,
    });
    setMessage("");
  };

  if (loading) return <p>Đang tải danh mục...</p>;

  return (
    <div className="container">
      <h2>Quản lý danh mục</h2>

      {error && <p className="error">{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Danh mục cha</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>
                  {c.parentId
                    ? categories.find((p) => p.id === c.parentId)?.name || "—"
                    : "Không có"}
                </td>
                <td>
                  <button onClick={() => handleEdit(c)}>Sửa</button>
                  <button
                    className="delete"
                    style={{ marginLeft: "5px" }}
                    onClick={() => handleDelete(c.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Không có danh mục nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
