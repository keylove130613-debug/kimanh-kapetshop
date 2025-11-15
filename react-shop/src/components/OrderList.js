import React, { useEffect, useState } from "react";
import OrderService from "../services/OrderService";
import "../styles2.css";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await OrderService.getAll();
      setOrders(data.content || data);
      setError("");
    } catch (err) {
      setError("Không thể tải danh sách đơn hàng!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đơn hàng này không?")) {
      try {
        await OrderService.delete(id);
        setMessage("Xóa đơn hàng thành công!");
        loadOrders();
      } catch {
        setError("Lỗi khi xóa đơn hàng!");
      }
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await OrderService.updateStatus(id, status);
      setMessage(`Cập nhật trạng thái thành ${status} thành công!`);
      loadOrders();
    } catch (err) {
      setError("Không thể cập nhật trạng thái!");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return { color: "#eab308", fontWeight: "bold" }; // vàng
      case "APPROVED":
        return { color: "#16a34a", fontWeight: "bold" }; // xanh lá
      case "SHIPPED":
        return { color: "#3b82f6", fontWeight: "bold" }; // xanh dương
      case "CANCELLED":
        return { color: "#dc2626", fontWeight: "bold" }; // đỏ
      default:
        return { color: "#6b7280" }; // xám
    }
  };

  return (
    <div className="order-container">
      <h2>Danh sách đơn hàng</h2>
      {loading && <p>Đang tải...</p>}
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên khách</th>
              <th>SĐT</th>
              <th>Địa chỉ</th>
              <th>Tổng tiền</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Sản phẩm</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.name}</td>
                  <td>{o.phone}</td>
                  <td>{o.address}</td>
                  <td>{o.total.toLocaleString()}₫</td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                  <td style={getStatusStyle(o.status)}>{o.status}</td>
                  <td>
                    <ul className="product-list">
                      {o.items.map((item, index) => (
                        <li key={index}>
                          {item.productName}
                          {item.size && (
                            <span className="size"> (Size: {item.size})</span>
                          )}
                          × {item.quantity} ={" "}
                          <strong>
                            {(item.price * item.quantity).toLocaleString()}₫
                          </strong>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(o.id)}>Xóa</button>
                    {o.status === "PENDING" && (
                      <>
                        <button
                          className="approve"
                          onClick={() => handleUpdateStatus(o.id, "APPROVED")}
                        >
                          Duyệt
                        </button>
                        <button
                          className="cancel"
                          onClick={() => handleUpdateStatus(o.id, "CANCELLED")}
                        >
                          Hủy
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  Không có đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
