import React, { useState } from "react";
import "../styles.css";
import BrandService from "../services/BrandService";

export default function BrandForm({ onSave }) {
  const [brand, setBrand] = useState({ name: "", image: "", description: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!brand.name.trim()) {
        setMessage("Vui lòng nhập tên thương hiệu!");
        return;
      }

      await BrandService.create(brand);
      setMessage("Thêm thương hiệu thành công!");
      setBrand({ name: "", image: "", description: "" });
      onSave(); // refresh BrandList
    } catch (err) {
      console.error(err);
      setMessage("Lỗi khi thêm thương hiệu!");
    }
  };

  return (
    <div className="category-form">
      <h3>Thêm thương hiệu</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên thương hiệu"
          value={brand.name}
          onChange={(e) => setBrand({ ...brand, name: e.target.value })}
        />
        <button type="submit">Thêm</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
