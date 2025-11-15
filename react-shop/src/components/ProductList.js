import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../services/ProductService";
import CategoryService from "../services/CategoryService";
import BrandService from "../services/BrandService";
import ProductSizeService from "../services/ProductSizeService";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [searchName, setSearchName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [productSizes, setProductSizes] = useState({});


  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8080"; // URL backend

  useEffect(() => {
    loadAll();
  }, []);
  const loadProductSizes = async (productId) => {
    try {
      const sizes = await ProductSizeService.getByProduct(productId);
      setProductSizes((prev) => ({
        ...prev,
        [productId]: sizes,
      }));
    } catch (err) {
      console.error("Lỗi khi tải size sản phẩm:", err);
    }
  };


  const loadAll = async () => {
    await loadProducts();
    await loadCategories();
    await loadBrands();
  };

  const loadProducts = async () => {
    try {
      const data = await ProductService.getAll();
      setProducts(data);

      // Load size cho từng product
      data.forEach(p => loadProductSizes(p.id));
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
    }
  };


  const loadCategories = async () => {
    try {
      const data = await CategoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error("Lỗi khi tải danh mục:", err);
    }
  };

  const loadBrands = async () => {
    try {
      const data = await BrandService.getAll();
      setBrands(data);
    } catch (err) {
      console.error("Lỗi khi tải thương hiệu:", err);
    }
  };

  const getBrandName = (id) => {
    const b = brands.find((x) => x.id === id);
    return b ? b.name : "Không rõ";
  };

  const getCategoryName = (id) => {
    const c = categories.find((x) => x.id === id);
    return c ? c.name : "Không rõ";
  };

  const handleSearch = async () => {
    try {
      let filtered = await ProductService.getAll();

      if (searchName.trim()) {
        const nameLower = searchName.toLowerCase();
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(nameLower)
        );
      }

      const min = Number(minPrice) || 0;
      const max = Number(maxPrice) || Infinity;
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);

      if (selectedCategory) {
        filtered = filtered.filter(
          (p) => Number(p.categoryId) === Number(selectedCategory)
        );
      }

      setProducts(filtered);
    } catch (err) {
      console.error(err);
      setMessage("Lỗi khi tìm kiếm sản phẩm!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;
    try {
      await ProductService.delete(id);
      setMessage("Đã xóa sản phẩm thành công!");
      loadProducts();
    } catch (err) {
      setMessage("Lỗi khi xóa sản phẩm!");
    }
  };

  const handleEdit = (product) => setEditingProduct(product);

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await ProductService.update(editingProduct.id, editingProduct);
      setMessage("Cập nhật sản phẩm thành công!");
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      setMessage("Lỗi khi cập nhật sản phẩm!");
    }

  };
  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  return (
    <div className="container">
      <h2>Danh sách sản phẩm</h2>

      {message && <p className="message">{message}</p>}

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm theo tên..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Giá từ"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Giá đến"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Tất cả danh mục --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Tìm kiếm</button>
        <button
          onClick={() => {
            setSearchName("");
            setMinPrice("");
            setMaxPrice("");
            setSelectedCategory("");
            loadProducts();
          }}
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Thương hiệu</th>
            <th>Danh mục</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Không có sản phẩm nào
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>                  {p.image ? (
                  <img
                    src={`http://localhost:8080${p.image}`}
                    alt={p.name}
                    className="product-image"
                  />) : (
                  "Không có ảnh"
                )}
                </td>
                <td>
                  {editingProduct?.id === p.id ? (
                    <input
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    p.name
                  )}
                </td>
                <td>
                  {productSizes[p.id] && productSizes[p.id].length > 0 ? (
                    <>
                      {productSizes[p.id].length > 1
                        ? `${Math.min(...productSizes[p.id].map(s => s.price || 0)).toLocaleString()}₫ - ${Math.max(...productSizes[p.id].map(s => s.price || 0)).toLocaleString()}₫`
                        : `${productSizes[p.id][0]?.price?.toLocaleString() || "0"}₫`}
                    </>
                  ) : (
                    "Đang tải..."
                  )}
                </td>

                <td>{getBrandName(p.brandId)}</td>
                <td>
                  {editingProduct?.id === p.id ? (
                    <select
                      value={String(editingProduct.categoryId)}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          categoryId: e.target.value,
                        })
                      }
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    getCategoryName(p.categoryId)
                  )}
                </td>
                <td className="product-description">                  {editingProduct?.id === p.id ? (
                  <textarea
                    rows={3}
                    value={editingProduct.description || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  <>
                    {expandedDescriptions[p.id]
                      ? p.description
                      : (p.description?.slice(0, 100) || "") +
                      (p.description?.length > 100 ? "..." : "")}
                    {p.description?.length > 100 && (
                      <button
                        style={{
                          display: "block",
                          background: "none",
                          color: "#007bff",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                        onClick={() => toggleDescription(p.id)}
                      >
                        {expandedDescriptions[p.id] ? "Thu gọn" : "Xem thêm"}
                      </button>
                    )}
                  </>
                )}
                </td>

                <td>
                  {editingProduct?.id === p.id ? (
                    <>
                      <button onClick={handleSaveEdit}>Lưu</button>
                      <button onClick={() => setEditingProduct(null)}>Hủy</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => navigate(`/products/${p.id}`)}>
                        Xem
                      </button>
                      <button onClick={() => handleEdit(p)}>Sửa</button>
                      <button onClick={() => handleDelete(p.id)}>Xóa</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
