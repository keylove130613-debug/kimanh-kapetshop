import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import ProductService from "../services/ProductService";
import CategoryService from "../services/CategoryService";
import ProductSizeService from "../services/ProductSizeService"; // thêm
import ProductCard from "../components/ProductCard";
import { Icon } from "@iconify/react";
import "../styles2.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState(null);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showPriceBox, setShowPriceBox] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [productSizes, setProductSizes] = useState({}); // thêm
  const priceBoxRef = useRef(null);

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

  const loadData = async () => {
    const resCat = await CategoryService.getAll();
    setCategories(resCat.data || []);

    const data = await ProductService.getAll();
    const list = Array.isArray(data) ? data : data.content || [];
    setProducts(list);
    setAllProducts(list);

    const sizesMap = {};
    await Promise.all(
      list.map(async (p) => {
        const sizes = await ProductSizeService.getByProduct(p.id);
        sizesMap[p.id] = sizes || [];
      })
    );
    setProductSizes(sizesMap);
  };

  useEffect(() => {
    loadData();
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

    setProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [query, minPrice, maxPrice, catId, productSizes]);

  const handleReset = () => {
    setQuery("");
    setMinPrice("");
    setMaxPrice("");
    setCatId(null);
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

  // Sắp xếp sản phẩm mới
  const newProducts = allProducts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <div className="home-container">
      <div className="home-container">

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
              Giá
              <Icon icon="mdi:chevron-down" />
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
            style={{
              width: "100px",
              height: "40px",
              flexShrink: 0,
              flexGrow: 0,
            }}
          >
            Reset
          </button>
        </div>

        <Banner>
          <div className="banner">
            <img src="/images/hero1.jpg" alt="Hero" className="banner-img" />
            <div className="banner-overlay">
              <h1>
                Chào mừng đến với <span className="highlight">KA Pet Shop</span>
              </h1>
              <p>Thế giới sản phẩm tốt nhất cho thú cưng của bạn ❤️</p>
              <Link to="/shop" className="banner-btn">
                Mua ngay
              </Link>
            </div>
          </div>
        </Banner>
      </div>

      <section className="container mx-auto mt-10 mb-16 px-4 flex">
        <div className="shop-main flex-1 ml-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="product-price-detail mb-4 flex items-center gap-2">
              <Icon icon="mdi:paw" width="30" />
              Sản phẩm nổi bật
            </h2>
          </div>
          <div className="product-grid mb-8">
            {products.length === 0 ? (
              <div>Không có sản phẩm nào</div>
            ) : (
              products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  sizes={productSizes[p.id] || []} // thêm
                />
              ))
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <Link to="/shop" className="btn">
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </section>

      {newProducts.length > 0 && (
        <section className="container mx-auto mt-16 px-4">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="product-price-detail mb-4 flex items-center gap-2">
              <Icon icon="mdi:paw" width="30" />
              Sản phẩm mới về
            </h2>
          </div>
          <div className="product-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.map((p) => (
              <ProductCard key={p.id} product={p} sizes={productSizes[p.id] || []} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/shop" className="btn">
              Khám phá bộ sưu tập mới
            </Link>
          </div>
        </section>
      )}

      <section className="container mx-auto mt-20 mb-16 px-4">
        <h2 className="product-price-detail mb-4 flex items-center gap-2">
          <Icon icon="mdi:gift" width="30" />
          Khuyến mãi hấp dẫn
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "mdi:gift",
              title: "Giảm giá mùa hè",
              desc: "Đến 50% tất cả sản phẩm thú cưng",
            },
            {
              icon: "mdi:new-box",
              title: "Sản phẩm mới",
              desc: "Bộ sưu tập thú cưng mới nhất",
            },
            {
              icon: "mdi:cart-plus",
              title: "Combo tiết kiệm",
              desc: "Mua 2 tặng 1 cho các sản phẩm phổ biến",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-xl overflow-hidden shadow-xl group cursor-pointer h-60"
            >
              <img
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-black bg-opacity-35 group-hover:bg-opacity-50 transition-all duration-500 flex flex-col justify-center items-center text-center text-white p-4">
                <Icon
                  icon={item.icon}
                  width="40"
                  className={`${item.color} mb-2 transition-transform duration-500 group-hover:scale-110`}
                />
                <h3 className="text-2xl font-bold mb-1 border-b border-yellow-300 pb-1">
                  {item.title}
                </h3>
                <p className="text-lg font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto mt-20 mb-16 px-4">
        <h2 className="product-price-detail mb-4 flex items-center gap-2">
          <Icon icon="mdi:emoticon-happy" width="30" />
          Khách hàng nói gì về chúng tôi
        </h2>        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl shadow-lg border border-gray-100 bg-white hover:shadow-2xl transition duration-300">
            <Icon icon="mdi:format-quote-open" className="text-3xl text-yellow-500 mb-3" />
            <p className="italic mb-4 text-gray-700">“Shop rất uy tín, giao hàng nhanh, thú cưng mình rất thích!”</p>
            <strong className="font-bold text-black">— Linh, TP HCM</strong>
          </div>
          <div className="p-6 rounded-xl shadow-lg border border-gray-100 bg-white hover:shadow-2xl transition duration-300">
            <Icon icon="mdi:format-quote-open" className="text-3xl text-yellow-500 mb-3" />
            <p className="italic mb-4 text-gray-700">“Sản phẩm chất lượng, giá hợp lý. Mình rất hài lòng.”</p>
            <strong className="font-bold text-black">— Nam, Hà Nội</strong>
          </div>
          <div className="p-6 rounded-xl shadow-lg border border-gray-100 bg-white hover:shadow-2xl transition duration-300">
            <Icon icon="mdi:format-quote-open" className="text-3xl text-yellow-500 mb-3" />
            <p className="italic mb-4 text-gray-700">“Dịch vụ khách hàng tốt, nhân viên thân thiện. Luôn mua ở đây!”</p>
            <strong className="font-bold text-black">— Hương, Đà Nẵng</strong>
          </div>
        </div>
      </section>

      <section className="newsletter bg-yellow-400 py-12 mt-16 text-center shadow-inner">
        <h2 className="text-3xl font-bold mb-3 text-black">Đăng ký nhận tin khuyến mãi</h2>
        <p className="text-lg mb-6 text-black">Nhận ngay ưu đãi độc quyền và tin tức thú cưng mới nhất!</p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Nhập email của bạn..."
            className="border px-5 py-3 rounded-l-full w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button className="bg-black text-white px-6 py-3 rounded-r-full font-bold hover:bg-gray-800 transition">
            Đăng ký
          </button>
        </div>
      </section>
    </div>
  );
}