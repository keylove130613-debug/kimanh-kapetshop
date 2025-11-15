import { Link } from "react-router-dom";

export default function ProductCard({ product, sizes = [], onAddFavorite, isFavorite }) {
  let displayPrice;
  if (!sizes || sizes.length === 0) {
    displayPrice = "Chưa có giá";
  } else if (sizes.length === 1) {
    displayPrice = `${Number(sizes[0].price).toLocaleString()}₫`;
  } else {
    const prices = sizes.map((s) => Number(s.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    displayPrice = `${minPrice.toLocaleString()}₫ - ${maxPrice.toLocaleString()}₫`;
  }


  const handleFavorite = () => {
    if (onAddFavorite) onAddFavorite(product, sizes[0]);
  };

  return (
    <div className="product-card relative group border border-gray-200 hover:border-blue-400 transition-all duration-300 bg-white flex flex-col items-center justify-between p-5 rounded-lg text-center shadow-sm hover:shadow-md">

      <Link to={`/product/${product.id}`} className="block w-full">
        <div className="w-full h-[220px] flex items-center justify-center bg-[#f9f9f9] overflow-hidden rounded-md">
          <img
            src={product.image ? `http://localhost:8080${product.image}` : "/placeholder.png"}
            alt={product.name}
            className="max-h-[200px] max-w-[200px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="mt-3">
        <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600 transition line-clamp-2">
          {product.name}
        </h3>
        <p className="product-price">{displayPrice}</p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <Link
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
          to={`/product/${product.id}`}
        >
          Xem chi tiết
        </Link>

        <button
          className={`w-9 h-9 flex items-center justify-center rounded-full border border-blue-300 hover:bg-blue-50 transition-all text-red-500`}
          onClick={handleFavorite}
        >
          {isFavorite ? "❤" : "♡"}
        </button>
      </div>
    </div>
  );
}
