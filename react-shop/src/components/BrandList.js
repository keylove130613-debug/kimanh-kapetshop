import React, { useEffect, useState } from "react";
import BrandService from "../services/BrandService";
import "../styles.css";

export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const [editingBrand, setEditingBrand] = useState(null);
  const [message, setMessage] = useState("");
  const [newBrand, setNewBrand] = useState({ name: "", image: "", description: "" });

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    const data = await BrandService.getAll();
    setBrands(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await BrandService.create(newBrand);
      setMessage("Thêm thương hiệu thành công!");
      setNewBrand({ name: "", image: "", description: "" });
      loadBrands();
    } catch {
      setMessage("Lỗi khi thêm!");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await BrandService.update(editingBrand.id, editingBrand);
      setEditingBrand(null);
      loadBrands();
    } catch {
      setMessage("Lỗi khi cập nhật!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xóa thương hiệu này?")) {
      await BrandService.delete(id);
      loadBrands();
    }
  };

  return (
    <div className="container">
      <h2>Quản lý Thương hiệu</h2>
      {message && <p>{message}</p>}

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>
                {editingBrand?.id === b.id ? (
                  <input
                    value={editingBrand.name}
                    onChange={(e) =>
                      setEditingBrand({ ...editingBrand, name: e.target.value })
                    }
                  />
                ) : (
                  b.name
                )}
              </td>
              <td>
                {editingBrand?.id === b.id ? (
                  <>
                    <button onClick={handleUpdate}>Lưu</button>
                    <button onClick={() => setEditingBrand(null)}>Hủy</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingBrand(b)}>Sửa</button>
                    <button onClick={() => handleDelete(b.id)}>Xóa</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
