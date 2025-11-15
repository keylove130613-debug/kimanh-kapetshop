import React, { useEffect, useState } from "react";
import ProductSizeService from "../services/ProductSizeService";

export default function ProductSizeAdmin({ productId }) {
  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState({ size: "", price: "" });
  const [editing, setEditing] = useState(null);

  const loadSizes = async () => {
    const data = await ProductSizeService.getByProduct(productId);
    setSizes(data);
  };

  useEffect(() => {
    loadSizes();
  }, [productId]);

  const handleAdd = async () => {
    if (!newSize.size || !newSize.price) return alert("Nhập đầy đủ thông tin!");
    await ProductSizeService.create({ ...newSize, productId });
    setNewSize({ size: "", price: "" });
    loadSizes();
  };

  const handleUpdate = async (id) => {
    if (!editing.size || !editing.price) return alert("Nhập đầy đủ thông tin!");
    await ProductSizeService.update(id, { ...editing, productId });
    setEditing(null);
    loadSizes();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn xóa size này?")) return;
    await ProductSizeService.delete(id);
    loadSizes();
  };

  return (
    <div>
      <h3>Quản lý Size</h3>
      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((s) => (
            <tr key={s.id}>
              <td>
                {editing?.id === s.id ? (
                  <input
                    value={editing.size}
                    onChange={(e) =>
                      setEditing({ ...editing, size: e.target.value })
                    }
                  />
                ) : (
                  s.size
                )}
              </td>
              <td>
                {editing?.id === s.id ? (
                  <input
                    type="number"
                    value={editing.price}
                    onChange={(e) =>
                      setEditing({ ...editing, price: e.target.value })
                    }
                  />
                ) : (
                  s.price
                )}
              </td>
              <td>
                {editing?.id === s.id ? (
                  <>
                    <button onClick={() => handleUpdate(s.id)}>Lưu</button>
                    <button onClick={() => setEditing(null)}>Hủy</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditing(s)}>Sửa</button>
                    <button onClick={() => handleDelete(s.id)}>Xóa</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                value={newSize.size}
                onChange={(e) => setNewSize({ ...newSize, size: e.target.value })}
                placeholder="Size"
              />
            </td>
            <td>
              <input
                type="number"
                value={newSize.price}
                onChange={(e) =>
                  setNewSize({ ...newSize, price: e.target.value })
                }
                placeholder="Giá"
              />
            </td>
            <td>
              <button onClick={handleAdd}>Thêm</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
