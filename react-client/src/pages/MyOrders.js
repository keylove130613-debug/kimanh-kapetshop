import React, { useEffect, useState } from "react";
import OrderService from "../services/OrderService";
import "../styles.css";
import { jwtDecode } from "jwt-decode";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Bạn cần đăng nhập để xem đơn hàng của mình.");
      setLoading(false);
      return;
    }

    try {

      const decoded = jwtDecode(token);
      console.log(decoded);
      const userId = Number(decoded.userId); // ⚡ ép kiểu number
      if (!userId) throw new Error("Token không chứa userId");

      fetchOrders(userId);
    } catch (err) {
      console.error(err);
      setError("Token không hợp lệ.");
      setLoading(false);
    }
  }, []);

  const fetchOrders = async (uid) => {
    setLoading(true);
    try {
      const data = await OrderService.getByUser(uid);
      setOrders(data);
      setError("");
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError("Không thể tải danh sách đơn hàng của bạn.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return { color: "#eab308", fontWeight: "bold" };
      case "APPROVED":
        return { color: "#16a34a", fontWeight: "bold" };
      case "SHIPPED":
        return { color: "#3b82f6", fontWeight: "bold" };
      case "CANCELLED":
        return { color: "#dc2626", fontWeight: "bold" };
      default:
        return { color: "#6b7280" };
    }
  };

  return (
    <div className="container">
      <h2>Đơn hàng của tôi</h2>
      {loading && <p>Đang tải...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && orders.length === 0 && !error && <p>Hiện tại bạn chưa có đơn hàng nào.</p>}
      {!loading && orders.length > 0 && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
              <th>Sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td style={getStatusStyle(o.status)}>{o.status}</td>
                <td>{o.total.toLocaleString()}₫</td>
                <td>
                  <ul style={{ paddingLeft: "16px" }}>
                    {o.items.map((item, idx) => (
                      <li key={idx}>
                        {item.productName} × {item.quantity} ({item.price.toLocaleString()}₫)
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
