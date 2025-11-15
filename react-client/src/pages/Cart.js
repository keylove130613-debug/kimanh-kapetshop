import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  // Cập nhật số lượng
  function updateQty(id, delta) {
    const c = cart.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i);
    setCart(c);
    localStorage.setItem("cart", JSON.stringify(c));
  }

  // Xóa sản phẩm
  function removeItem(id) {
    if (window.confirm("Xóa sản phẩm này khỏi giỏ hàng?")) {
      const c = cart.filter(i => i.id !== id);
      setCart(c);
      localStorage.setItem("cart", JSON.stringify(c));
    }
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (cart.length === 0) return <div className="section"><h2>Giỏ hàng trống</h2></div>;

  return (
    <div className="section">
      <h2>Giỏ hàng của bạn</h2>
      <table className="cart-table">
        <thead>
          <tr><th>SP</th><th>Giá</th><th>Số lượng</th><th>Tổng</th><th></th></tr>
        </thead>
        <tbody>
          {cart.map((i, index) => (
            <tr key={index}>
              <td className="cart-item">
                <img
                  src={i.image ? `http://localhost:8080${i.image}` : "/placeholder.png"}
                  alt={i.name}
                />
                <div>
                  <span>{i.name}</span>
                  {i.size && <span style={{ display: "block", fontSize: "0.9rem", color: "#555" }}>Size: {i.size}</span>}
                </div>
              </td>
              <td>{Number(i.price).toLocaleString()}₫</td>
              <td>
                <button className="btn-ghost" disabled={i.qty <= 1} onClick={() => updateQty(i.id, -1)}>-</button>
                <span style={{ margin: "0 8px" }}>{i.qty}</span>
                <button className="btn-ghost" onClick={() => updateQty(i.id, +1)}>+</button>
              </td>
              <td>{Number(i.price * i.qty).toLocaleString()}₫</td>
              <td><button className="btn-ghost" onClick={() => removeItem(i.id)}>Xóa</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <div>Tổng: <strong>{Number(total).toLocaleString()}₫</strong></div>
        <button className="btn" onClick={() => navigate("/checkout")}>
          Thanh toán
        </button>
      </div>
    </div>
  );
}
