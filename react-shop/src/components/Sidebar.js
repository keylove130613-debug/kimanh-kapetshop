import React from "react";
import "../styles.css";

export default function Sidebar({ selected, onSelect }) {
  const items = [
    { key: "product", label: "Sản phẩm" },
    { key: "category", label: "Danh mục" },
    { key: "brand", label: "Thương hiệu" },
    { key: "user", label: "Người dùng" },
    { key: "order", label: "Đơn hàng" },
  ];

  return (
    <div className="sidebar">
      <ul>
        {items.map((item) => (
          <li
            key={item.key}
            className={selected === item.key ? "active" : ""}
            onClick={() => onSelect(item.key)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
