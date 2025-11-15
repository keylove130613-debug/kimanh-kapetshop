import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer";
import Shop from './pages/Shop';
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import AddressPage from "./pages/Address";
import MyOrders from "./pages/MyOrders";
import Contact from "./pages/Contact";
import MessageToast from "./components/MessageToast";

export default function App() {
  return (
    <div className="app d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/contact" element={<Contact />} />


<Route path="/change-password" element={<ChangePassword />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}
