import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import "./styles.css";
import OrderList from "./components/OrderList";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "ADMIN") setIsAuthenticated(true);
  }, []);


  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && (
        <nav className="navbar">
          <Link to="/">Trang chủ</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Admin />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/admin/orders"
          element={
            isAuthenticated ? <OrderList /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
