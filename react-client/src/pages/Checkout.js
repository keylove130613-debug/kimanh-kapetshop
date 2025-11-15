import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import AddressService from "../services/AddressService";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [showAddressList, setShowAddressList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);

    const username = localStorage.getItem("username");
    if (!username) return;

    UserService.getProfile(username)
      .then(user => setForm(f => ({ ...f, name: user.name || f.name, phone: user.phone || f.phone })))
      .catch(err => console.error(err));

    AddressService.getAddresses(username)
      .then(list => {
        setAddresses(list);
        const defaultAddr = list.find(a => a.defaultAddress);
        if (defaultAddr) {
          setForm(f => ({
            ...f,
            name: defaultAddr.receiverName,
            phone: defaultAddr.phone,
            address: defaultAddr.addressLine,
            note: defaultAddr.note || ""
          }));
        }
      })
      .catch(err => console.error("Lỗi lấy địa chỉ:", err));
  }, []);

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shippingFee = subtotal >= 500000 ? 0 : 30000;
  const totalAmount = subtotal + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectAddress = (addr) => {
    setForm({
      name: addr.receiverName,
      phone: addr.phone,
      address: addr.addressLine,
      note: addr.note || ""
    });
    setShowAddressList(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    const orderData = {
      userId: 1,
      name: form.name,
      email: "example@gmail.com",
      phone: form.phone,
      address: form.address,
      subtotal,
      shippingFee,
      total: totalAmount,
      items: cart.map(i => ({
        productId: i.id,
        productName: i.name,
        sizeId: i.sizeId,
        size: i.size,
        price: i.price,
        quantity: i.qty
      }))

    };

    try {
      await axios.post("http://localhost:8080/api/orders/create", orderData);
      alert("Đặt hàng thành công!");
      localStorage.removeItem("cart");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi đặt hàng!");
    }
  };

  if (cart.length === 0) return <div style={{ padding: 20 }}><h2>Giỏ hàng trống</h2></div>;

  return (
    <div style={{ display: "flex", padding: 20, gap: 40 }}>
      {/* Form thanh toán */}
      <div style={{ flex: 1, border: "1px solid #ddd", borderRadius: 8, padding: 20 }}>
        <h2>Thông tin nhận hàng</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label>Họ tên</label>
          <input name="name" value={form.name} onChange={handleChange} required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
          <label>Số điện thoại</label>
          <input name="phone" value={form.phone} onChange={handleChange} required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
          <label>Địa chỉ</label>
          <input name="address" value={form.address} onChange={handleChange} required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
          <label>Ghi chú</label>
          <textarea name="note" value={form.note} onChange={handleChange} rows="3" style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />

          <button
            type="button"
            onClick={() => setShowAddressList(!showAddressList)}
            style={{
              backgroundColor: "#f0f0f0",
              color: "#000",
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            {showAddressList ? "Đóng danh sách địa chỉ" : "Đổi địa chỉ"}
          </button>

          {showAddressList && (
            <div style={{ marginTop: 10, border: "1px solid #ddd", borderRadius: 8, padding: 10 }}>
              {addresses.map(addr => (
                <div key={addr.id} style={{ padding: 8, borderBottom: "1px solid #eee", cursor: "pointer" }} onClick={() => handleSelectAddress(addr)}>
                  {addr.defaultAddress && <span style={{ color: "green", fontWeight: "bold" }}>Mặc định</span>}
                  <p><b>{addr.receiverName}</b></p>
                  <p>{addr.phone}</p>
                  <p>{addr.addressLine}</p>
                  {addr.note && <p>Ghi chú: {addr.note}</p>}
                </div>
              ))}
            </div>
          )}

          <button type="submit" style={{ backgroundColor: "#009ff5ff", color: "#fff", padding: 12, border: "none", borderRadius: 8, cursor: "pointer", marginTop: 16 }}>
            Xác nhận đặt hàng
          </button>
        </form>
      </div>

      {/* Bảng giỏ hàng */}
      <div style={{ flex: 1, border: "1px solid #ddd", borderRadius: 8, padding: 20 }}>
        <h2>Đơn hàng của bạn</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Sản phẩm</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Giá</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Số lượng</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Tổng</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(i => (
              <tr key={i.id}>
                <td style={{ padding: 8 }}>{i.name} {i.size && `(${i.size})`}</td>
                <td style={{ padding: 8 }}>{Number(i.price).toLocaleString()}₫</td>
                <td style={{ padding: 8 }}>{i.qty}</td>
                <td style={{ padding: 8 }}><b>{Number(i.qty * i.price).toLocaleString()}₫</b></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 16, textAlign: "right" }}>
          <p>Tạm tính: {Number(subtotal).toLocaleString()}₫</p>
          <p>Phí ship: {shippingFee > 0 ? `${shippingFee.toLocaleString()}₫` : "Miễn phí"}</p>
          <p><b>Tổng cộng: {Number(totalAmount).toLocaleString()}₫</b></p>
        </div>
      </div>
    </div>
  );
}
