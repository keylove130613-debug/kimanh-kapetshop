import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <footer id="footer" className="mt-5">
      <div className="container py-5 my-5">
        <img
          src="/images/logo.jpg"
          alt="KA Pet Shop Logo"
          className="footer-logo mb-3"
        />

        <div className="row text-secondary">

          <div className="col-md-3 mb-4">
            <div className="footer-menu">
              <p className="fs-6">
                Cung cấp sản phẩm và dịch vụ tốt nhất dành cho thú cưng của bạn.
              </p>
              <p className="mt-3">
                Địa chỉ: 20, Tăng Nhơn Phú, P.Phước Long B, TP. Thủ Đức, TP.HCM
              </p>
              <p>Hotline: 0909 999 999</p>
              <p>Email: contact@kapetshop.vn</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="footer-menu">
              <h4 className="mb-3 text-uppercase">Thông tin</h4>
              <p>Về chúng tôi</p>
              <p>Dịch vụ</p>
              <p>Chính sách bảo hành</p>
              <p>Tuyển dụng</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="footer-menu">
              <h4 className="mb-3 text-uppercase">Hỗ trợ khách hàng</h4>
              <p>Hướng dẫn mua hàng</p>
              <p>Thanh toán & giao hàng</p>
              <p>Đổi trả & hoàn tiền</p>
              <p>Liên hệ hỗ trợ</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="footer-menu">
              <h4 className="mb-3 text-uppercase">Tin tức & Ưu đãi</h4>
              <p>
                Đăng ký nhận thông tin khuyến mãi và cập nhật sản phẩm mới
                nhất từ KA Pet Shop.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4 border-top border-secondary mt-4">
          <p className="mb-0 small text-muted">
            2025 © KA Pet Shop — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
