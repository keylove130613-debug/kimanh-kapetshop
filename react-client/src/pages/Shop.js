import { useEffect, useState, useRef } from "react";
import ProductService from "../services/ProductService";
import CategoryService from "../services/CategoryService";
import ProductSizeService from "../services/ProductSizeService";
import ProductCard from "../components/ProductCard";
import CategorySidebar from "../components/CategorySidebar";
import BrandSidebar from "../components/BrandSidebar";
import { Icon } from "@iconify/react";
import "../styles2.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showPriceBox, setShowPriceBox] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [productSizes, setProductSizes] = useState({});
  const priceBoxRef = useRef(null);

  // Click outside để tắt popup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (priceBoxRef.current && !priceBoxRef.current.contains(e.target)) {
        setShowPriceBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function normalizeString(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const loadCategories = async () => {
    try {
      const res = await CategoryService.getAll();
      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await ProductService.getAll();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.content)
          ? data.content
          : [];
      setProducts(list);
      setAllProducts(list);

      // load sizes ngay khi load product
      const sizesMap = {};
      await Promise.all(
        list.map(async (p) => {
          const sizes = await ProductSizeService.getByProduct(p.id);
          sizesMap[p.id] = sizes || [];
        })
      );
      setProductSizes(sizesMap);
    } catch (err) {
      console.error(err);
    }
  };

  const loadProductSizes = async (productId) => {
    try {
      const sizes = await ProductSizeService.getByProduct(productId);
      setProductSizes(prev => ({ ...prev, [productId]: sizes }));
    } catch (err) {
      console.error(err);
    }
  };

  // khi products thay đổi, load sizes
  useEffect(() => {
    products.forEach(p => loadProductSizes(p.id));
  }, [products]);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const filterProducts = () => {
    let filtered = [...allProducts];

    if (query.trim()) {
      const q = normalizeString(query);
      filtered = filtered.filter((p) =>
        normalizeString(p.name).includes(q)
      );
    }

    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Infinity;

    filtered = filtered.filter((p) => {
      const sizes = productSizes[p.id] || [{ price: p.price }];
      const prices = sizes.map((s) => Number(s.price));
      const minP = Math.min(...prices);
      const maxP = Math.max(...prices);
      return maxP >= min && minP <= max;
    });


    if (catId) filtered = filtered.filter((p) => Number(p.categoryId) === Number(catId));
    if (brandId) filtered = filtered.filter((p) => Number(p.brandId) === Number(brandId));

    setProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [query, minPrice, maxPrice, catId, brandId, productSizes]);

  const handleReset = () => {
    setQuery("");
    setMinPrice("");
    setMaxPrice("");
    setCatId(null);
    setBrandId(null);
    setProducts(allProducts);
  };

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const q = normalizeString(value);
    const matched = allProducts
      .filter((p) => normalizeString(p.name).includes(q))
      .slice(0, 5);
    setSuggestions(matched);
  };

  return (
    <div className="shop-page flex gap-6">
      <div className="flex flex-col md:w-64 gap-4">
        <CategorySidebar onSelect={setCatId} selected={catId} categories={categories} />
        <BrandSidebar onSelect={setBrandId} selected={brandId} />
      </div>

      <div className="shop-main flex-1">
        <div className="filter-row mb-4 flex gap-2 items-center">
          <div className="relative flex-1">
            <input
              placeholder="Tìm theo tên sản phẩm..."
              value={query}
              onChange={handleQueryChange}
              className="input input-bordered rounded-lg border px-3 py-2 w-full"
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border rounded-lg mt-1 shadow-lg z-10 max-h-48 overflow-auto">
                {suggestions.map((p) => (
                  <li
                    key={p.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setQuery(p.name);
                      setSuggestions([]);
                    }}
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="price-dropdown relative" ref={priceBoxRef}>
            <div
              className="price-toggle flex items-center gap-1 border px-3 py-2 rounded-lg cursor-pointer bg-white hover:bg-gray-50"
              onClick={() => setShowPriceBox(!showPriceBox)}
            >
              Giá  <Icon icon="mdi:chevron-down" />
            </div>
            {showPriceBox && (
              <div className="price-popup absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-3 w-56 z-10">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <input
                    type="number"
                    placeholder="₫ MIN"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border rounded px-2 py-1 w-20 text-sm"
                  />
                  <span>—</span>
                  <input
                    type="number"
                    placeholder="₫ MAX"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border rounded px-2 py-1 w-20 text-sm"
                  />
                </div>
                <button
                  onClick={() => setShowPriceBox(false)}
                  className="bg-black text-white w-full py-1 rounded text-sm font-semibold hover:bg-gray-800"
                >
                  APPLY
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            className="border rounded-lg hover:bg-gray-100 text-center"
            style={{ width: "100px", height: "40px" }}
          >
            Reset
          </button>
        </div>

        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length === 0 ? (
            <div>Không có sản phẩm nào</div>
          ) : (
            products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                sizes={productSizes[p.id] || []}
                onAddFavorite={(product, size) => {
                  const fav = JSON.parse(localStorage.getItem("favorites") || "[]");
                  if (!fav.find(f => f.id === product.id)) {
                    fav.push({
                      id: product.id,
                      name: product.name,
                      price: size?.price || product.price,
                      image: product.image || "/placeholder.png"
                    });
                    localStorage.setItem("favorites", JSON.stringify(fav));
                    alert("Đã thêm vào yêu thích!");
                  }
                }}
              />
            ))

          )}
        </div>
      </div>
    </div>
  );
}
