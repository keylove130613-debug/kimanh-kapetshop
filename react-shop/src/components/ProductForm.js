import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import CategoryService from "../services/CategoryService";
import BrandService from "../services/BrandService";
import ProductSizeService from './../services/ProductSizeService';

export default function ProductForm({ onSave }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    categoryId: "",
    brandId: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [message, setMessage] = useState("");
  const [sizes, setSizes] = useState([{ size: "", price: "" }]);

  useEffect(() => {
    loadCategories();
    loadBrands();
  }, []);

  const loadCategories = async () => {
    const data = await CategoryService.getAll();
    setCategories(data);
  };

  const loadBrands = async () => {
    const data = await BrandService.getAll();
    setBrands(data);
  };
  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const addSizeRow = () => setSizes([...sizes, { size: "", price: "" }]);
  const removeSizeRow = (index) => setSizes(sizes.filter((_, i) => i !== index));
  

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!product.name.trim()) return setMessage("Nhập tên sản phẩm!");
  if (!product.price) return setMessage("Nhập giá sản phẩm!");
  if (!product.categoryId) return setMessage("Chọn danh mục!");
  if (!product.brandId) return setMessage("Chọn thương hiệu!");
  if (!image) return setMessage("Chọn ảnh sản phẩm!");

  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("categoryId", product.categoryId);
  formData.append("brandId", product.brandId);
  formData.append("image", image);
  formData.append("description", product.description);

  try {
    const createdProduct = await ProductService.create(formData, true);

    for (const s of sizes) {
      if (!s.size || !s.price) continue;
      await ProductSizeService.create({
        size: s.size,
        price: parseFloat(s.price),
        productId: createdProduct.id
      });
    }

    setMessage("Thêm sản phẩm thành công!");
    if (onSave) await onSave();

    setProduct({ name: "", price: "", categoryId: "", brandId: "", description: "" });
    setImage(null);
    setSizes([{ size: "", price: "" }]);

  } catch (err) {
    console.error(err);
    setMessage("Lỗi khi thêm sản phẩm!");
  }
};

  return (
    <div className="category-form">
      <h3>Thêm sản phẩm mới</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Giá"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <textarea
          placeholder="Mô tả sản phẩm"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <select
          value={product.categoryId}
          onChange={(e) =>
            setProduct({ ...product, categoryId: e.target.value })
          }
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={product.brandId}
          onChange={(e) => setProduct({ ...product, brandId: e.target.value })}
        >
          <option value="">-- Chọn thương hiệu --</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <h4>Sizes</h4>
{sizes.map((s, i) => (
  <div key={i}>
    <input type="text" placeholder="Size" value={s.size} onChange={e => handleSizeChange(i, "size", e.target.value)} />
    <input type="number" placeholder="Price" value={s.price} onChange={e => handleSizeChange(i, "price", e.target.value)} />
    <button type="button" onClick={() => removeSizeRow(i)}>Xóa</button>
  </div>
))}
<button type="button" onClick={addSizeRow}>Thêm size</button>


        <button type="submit">Thêm</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
