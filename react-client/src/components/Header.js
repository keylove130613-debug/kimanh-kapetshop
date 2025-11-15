import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "../styles.css";

export default function Header() {
  const navigate = useNavigate();
  const isLogged = !!UserService.getToken();
  const username = localStorage.getItem("username");

  function handleLogout() {
    UserService.logout();
    navigate("/");
  }

  return (
    <header className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">KA Pet Shop</Link>
        <Link to="/shop" className="nav-link">Sản phẩm</Link>
      </div>

      <div className="nav-right">
        <Link to="/contact" className="nav-link">Liên hệ</Link>
        <Link to="/favorites" className="nav-link">Yêu thích</Link>
        <Link to="/cart" className="nav-link">Giỏ hàng</Link>

        {isLogged ? (
          <>
            <Link to="/profile" className="nav-link">
               {username || "Tài khoản"}
            </Link>
            <button className="btn-ghost" onClick={handleLogout}>
              Đăng xuất
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Đăng nhập</Link>
        )}
      </div>
    </header>
  );
}
