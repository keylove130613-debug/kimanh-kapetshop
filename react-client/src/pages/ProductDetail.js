import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import BrandService from "../services/BrandService";
import ReviewService from "../services/ReviewService";
import ProductSizeService from "../services/ProductSizeService";
import MessageToast from "../components/MessageToast";
import "../styles.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // === State ===
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [message, setMessage] = useState(null);
  const [review, setReview] = useState({
    name: localStorage.getItem("username") || "",
    rating: 5,
    comment: "",
  });

  // === Fetch sản phẩm + brand + review ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductService.getById(id);
        setProduct(data);

        const resBrands = await BrandService.getAll();
        const brands = resBrands.data || resBrands;
        const brand = brands.find((b) => Number(b.id) === Number(data.brandId));
        setBrandName(brand ? brand.name || brand.title : "Không rõ");

        const resReviews = await ReviewService.getByProduct(id);
        setReviews(resReviews.data || []);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      }
    };
    fetchData();
  }, [id]);

  // === Fetch size ===
  useEffect(() => {
    const fetchSizes = async () => {
      const data = await ProductSizeService.getByProduct(id);
      setSizes(data);
    }
    fetchSizes();
  }, [id]);


  // === Chọn size mặc định ===
  useEffect(() => {
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes]);


  // === Kiểm tra favorite ===
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favs.some((f) => f.id === Number(id)));
  }, [id]);

  // === Toast tự tắt ===
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // === Toggle favorite ===
  function toggleFavorite() {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!product) return;
    if (isFavorite) {
      const updated = favs.filter((f) => f.id !== product.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
      setMessage({ type: "success", text: "Đã xóa khỏi yêu thích" });
    } else {
      favs.push({
        id: product.id,
        name: product.name,
        price: selectedSize?.price || product.price,
        image: product.image || "/placeholder.png",
      });
      localStorage.setItem("favorites", JSON.stringify(favs));
      setIsFavorite(true);
      setMessage({ type: "success", text: "Đã thêm vào yêu thích" });
    }
  }

  // === Thêm vào giỏ hàng ===
  function addToCart() {
    if (!selectedSize) {
      setMessage({ type: "error", text: "Vui lòng chọn size!" });
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const item = cart.find(
      (i) => i.id === product.id && i.sizeId === selectedSize.id
    );

    if (item) item.qty += product.qty || 1;
    else
      cart.push({
        id: product.id,
        name: product.name,
        price: selectedSize.price,
        qty: product.qty || 1,
        image: product.image || "/placeholder.png",
        size: selectedSize.size,
        sizeId: selectedSize.id,
      });

    localStorage.setItem("cart", JSON.stringify(cart));
    setMessage({ type: "success", text: "Đã thêm vào giỏ hàng!" });
  }

  // === Gửi đánh giá ===
  async function submitReview(e) {
    e.preventDefault();
    if (!review.name.trim() || !review.comment.trim()) {
      setMessage({ type: "error", text: "Vui lòng nhập đầy đủ thông tin!" });
      return;
    }

    try {
      await ReviewService.add({
        productId: id,
        name: review.name,
        rating: review.rating,
        comment: review.comment,
      });
      const resReviews = await ReviewService.getByProduct(id);
      setReviews(resReviews.data || []);
      setReview({ name: "", rating: 5, comment: "" });
      setMessage({ type: "success", text: "Đã gửi đánh giá!" });
    } catch (err) {
      console.error("Lỗi khi gửi đánh giá:", err);
      setMessage({ type: "error", text: "Không thể gửi đánh giá!" });
    }
  }

  if (product === null) return <p>Đang tải sản phẩm...</p>;
  if (product && !product.id) return <p>Sản phẩm không tồn tại</p>;

  return (
    <>
      <div className="product-detail container vertical">
        <div className="detail-image">
          <img
            src={product.image ? `http://localhost:8080${product.image}` : "/placeholder.png"}
            alt={product.name}
          />
        </div>

        <div className="detail-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-category">
            <strong>Thương hiệu:</strong> {brandName}
          </p>
          <p className="product-price-detail">
            {Number(selectedSize?.price || product.price).toLocaleString()}₫
          </p>


          <div className="size-selector">
            <label>Chọn size:</label>
            {sizes.map((s) => (
              <button
                key={s.id}
                className={`size-btn ${selectedSize?.id === s.id ? "selected" : ""}`}
                onClick={() => setSelectedSize(s)}
              >
                {s.size} — {Number(s.price).toLocaleString()}₫
              </button>
            ))}
          </div>

          <div className="qty-control">
            <button
              onClick={() =>
                setProduct({ ...product, qty: Math.max(1, (product.qty || 1) - 1) })
              }
            >
              −
            </button>
            <span>{product.qty || 1}</span>
            <button
              onClick={() =>
                setProduct({ ...product, qty: (product.qty || 1) + 1 })
              }
            >
              ＋
            </button>
          </div>

          <div className="actions">
            <button className="btn big-btn" onClick={addToCart}>
              Thêm vào giỏ
            </button>
            <button
              className={`btn-ghost text-4xl ${isFavorite ? "text-red-500" : "text-gray-500"}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? "❤︎" : "♡"}
            </button>
            <button className="btn-ghost" onClick={() => navigate(-1)}>
              ← Quay lại
            </button>
          </div>

          <div className="shipping-info">
            <img className="truck-icon" src="/images/truck.png" alt="Truck" />
            <div>
              <strong>Miễn phí vận chuyển</strong>
              <p>Tối đa 30K cho đơn hàng từ 500K</p>
              <p>Hỏa tốc 4h trong nội thành HCM</p>
            </div>
          </div>

          <div className="product-desc">
            <h3>Mô tả sản phẩm</h3>
            <p>{product.description || "Không có mô tả."}</p>
          </div>

          <div className="product-reviews">
            <h3>Đánh giá sản phẩm</h3>
            <form onSubmit={submitReview} className="review-form">
              {!localStorage.getItem("username") && (
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  value={review.name}
                  onChange={(e) => setReview({ ...review, name: e.target.value })}
                  required
                />
              )}
              <select
                value={review.rating}
                onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} ⭐
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Nhập nội dung đánh giá..."
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                required
              />
              <button type="submit" className="btn">
                Gửi đánh giá
              </button>
            </form>

            <div className="review-list">
              {reviews.length === 0 ? (
                <p>Chưa có đánh giá nào.</p>
              ) : (
                reviews.map((r, i) => (
                  <div key={i} className="review-item">
                    <strong>{r.name}</strong> — <span>{r.rating} ⭐</span>
                    <p>{r.comment}</p>
                    <small>{r.date}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <MessageToast message={message} onClose={() => setMessage(null)} />
    </>
  );
}
