import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryService from "../services/CategoryService";
import ProductService from "../services/ProductService";
import ProductSizeAdmin from "../components/ProductSizeAdmin";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getById(id);
        setProduct(data);

        const categories = await CategoryService.getAll();
        const cat = categories.find(c => c.id === data.categoryId);
        setCategoryName(cat ? cat.name : "Không rõ");
      } catch (err) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Đang tải...</p>;

  return (
    <div className="container">
      <h2>Chi tiết sản phẩm</h2>
      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Tên:</strong> {product.name}</p>
      <p><strong>Giá:</strong> {product.price}</p>
      <p><strong>Danh mục:</strong> {categoryName}</p>
      <ProductSizeAdmin productId={product.id} />

      <p><strong>Mô tả:</strong> {product.description || "Không có mô tả"}</p>
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
}
