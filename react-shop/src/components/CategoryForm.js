import React, { useState, useEffect } from "react";
import CategoryService from "../services/CategoryService";
import "../styles.css";

export default function CategoryForm({ onSave }) {
  const [category, setCategory] = useState({ name: "", parentId: null });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryService.getAll().then((data) => setCategories(data || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CategoryService.create(category);
    onSave();
    setCategory({ name: "", parentId: null });
  };

  return (
    <div className="category-form">
      <h3>Thêm danh mục</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên danh mục"
          value={category.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />

        <select
          value={category.parentId || ""}
          onChange={(e) =>
            setCategory({
              ...category,
              parentId: e.target.value ? parseInt(e.target.value) : null,
            })
          }
        >
          <option value="">-- Không có danh mục cha --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}
