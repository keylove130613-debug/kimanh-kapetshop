import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const images = [
  { src: "/images/bg.png", title: "Chào mừng đến KA Pet Shop", subtitle: "Thế giới sản phẩm tốt nhất cho thú cưng của bạn ❤️" },
  { src: "/images/bl.jpg", title: "Sản phẩm chất lượng", subtitle: "Mua sắm dễ dàng, giao hàng nhanh chóng" },
  { src: "/images/bann2.jpg" },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="banner-slider" style={{ position: "relative", overflow: "hidden", height: "400px" }}>
      <div
        className="banner-wrapper"
        style={{
          display: "flex",
          transform: `translateX(-${current * 100}%)`,
          transition: "transform 0.8s ease-in-out",
          height: "100%",
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="banner-slide"
            style={{
              backgroundImage: `url(${img.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minWidth: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "20%",
                left: "10%",
                color: "white",
                textShadow: "1px 1px 6px rgba(0,0,0,0.7)",
              }}
            >
              <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{img.title}</h1>
              <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>{img.subtitle}</p>
              <Link
                to="/shop"
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#48bb78",
                  borderRadius: "6px",
                  color: "white",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Mua ngay
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Nút next/prev */}
      <button
        className="banner-btn prev"
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          fontSize: "2rem",
          background: "rgba(0,0,0,0.3)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        ❮
      </button>
      <button
        className="banner-btn next"
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          fontSize: "2rem",
          background: "rgba(0,0,0,0.3)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        ❯
      </button>

      {/* Dots */}
      <div
        className="banner-dots"
        style={{
          position: "absolute",
          bottom: "15px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              margin: "0 5px",
              borderRadius: "50%",
              backgroundColor: current === index ? "#48bb78" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}
