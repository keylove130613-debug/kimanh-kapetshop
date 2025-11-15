import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Icon } from "@iconify/react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  function handleRemoveFavorite(product) {
    const updated = favorites.filter(p => p.id !== product.id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Bạn chưa có sản phẩm yêu thích nào.
      </div>
    );
  }

  return (
    <div className="p-5">

        <h2 className="product-price-detail mb-4 flex items-center gap-2">
          <Icon icon="mdi:heart" width="30" />
        Sản phẩm yêu thích
        </h2>     
        <div className="product-grid">
        {favorites.map(product => (
          <ProductCard
  key={product.id}
  product={product}
  sizes={product.sizes || [{ price: product.price }]} // <-- lấy giá từ sizes nếu có
  onAddFavorite={handleRemoveFavorite}
  style={{
    minHeight: "360px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }}
/>

        ))}
      </div>
    </div>
  );
}
