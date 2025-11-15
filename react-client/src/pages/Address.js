import { useEffect, useState } from "react";
import AddressService from "../services/AddressService";
import "../styles2.css";

export default function AddressPage() {
  const username = localStorage.getItem("username");
  const [addresses, setAddresses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    receiverName: "",
    phone: "",
    addressLine: "",
    note: "",
    defaultAddress: false, 
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const data = await AddressService.getAddresses(username);
      setAddresses(data);
    } catch (err) {
      console.error("Lỗi tải địa chỉ:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };
  const handleSubmit = async () => {
    try {
      if (editing) {
        await AddressService.updateAddress(editing, form);
      } else {
        const newForm = {
          receiverName: form.receiverName,
          phone: form.phone,
          addressLine: form.addressLine,
          note: form.note,
          defaultAddress: !!form.defaultAddress
        };

        await AddressService.addAddress(username, newForm);
      }
      setForm({ receiverName: "", phone: "", addressLine: "", note: "", defaultAddress: false });
      setEditing(null);
      loadAddresses();
    } catch (err) {
      console.error("Lỗi lưu địa chỉ:", err.response?.data || err.message);
    }
  };

  const handleEdit = (addr) => {
    setEditing(addr.id);
    setForm(addr);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa địa chỉ?")) {
      try {
        await AddressService.deleteAddress(id);
        loadAddresses();
      } catch (err) {
        console.error("Lỗi xóa địa chỉ:", err);
      }
    }
  };

  return (
    <div className="address-container">
      <h2>Thêm địa chỉ giao hàng</h2>

      <div className="address-form">
        <input name="receiverName" placeholder="Tên người nhận" value={form.receiverName} onChange={handleChange} />
        <input name="phone" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} />
        <input name="addressLine" placeholder="Địa chỉ" value={form.addressLine} onChange={handleChange} />
        <input name="note" placeholder="Ghi chú" value={form.note} onChange={handleChange} />
        <label>
          Mặc định
          <input type="checkbox" name="defaultAddress" checked={form.defaultAddress} onChange={handleChange} />
        </label>
        <button onClick={handleSubmit}>{editing ? "Cập nhật" : "Thêm địa chỉ"}</button>
      </div>

      <div className="address-list">
        {addresses.map((addr) => (
          <div className="address-card" key={addr.id}>
            {addr.defaultAddress && <span className="default">Mặc định</span>}
            <p><b>{addr.receiverName}</b></p>
            <p>{addr.phone}</p>
            <p>{addr.addressLine}</p>
            {addr.note && <p>Ghi chú: {addr.note}</p>}
            <div className="buttons">
              <button className="edit" onClick={() => handleEdit(addr)}>Sửa</button>
              <button className="delete" onClick={() => handleDelete(addr.id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
