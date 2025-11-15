import { useState } from "react";
import "../styles.css";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        content: "Tôi cần được tư vấn thêm về sản phẩm/dịch vụ...",
    });

    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const ContactCard = ({ icon, title, text, subText }) => (
  <div className="contact-card">
    {icon && <i className={`contact-icon ${icon}`}></i>}
    <div className="contact-card-content">
      <h5 className="contact-card-title">{title}</h5>
      {title === "Email" ? (
        <a href={`mailto:${text}`} className="contact-card-link">{text}</a>
      ) : (
        <p className="contact-card-text">{text}</p>
      )}
      {subText && <small className="contact-card-sub">{subText}</small>}
    </div>
  </div>
);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess("");

        try {
            console.log("Form submitted:", form);
            setSuccess("Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.");
            setForm({
                name: "",
                email: "",
                phone: "",
                content: "Tôi cần được tư vấn thêm về sản phẩm/dịch vụ...",
            });
        } catch (err) {
            console.error(err);
            setErrors({ form: "Có lỗi xảy ra, vui lòng thử lại." });
        }
    };

    return (
        <div className="contact-container">
            <h1 className="contact-title">Thông tin cửa hàng</h1>

            <div className="contact-grid">
                <ContactCard
                    title="Số điện thoại"
                    text="1800 6750"
                    subText="Giờ làm việc: 7:00 - 22:00 (T2 - CN)"
                />
                <ContactCard
                    title="Email"
                    text="support@ka.vn"
                    subText="Gửi yêu cầu qua email của chúng tôi"
                />
                <ContactCard
                    title="Địa chỉ"
                    text="20 Tăng Nhơn Phú, Phường Phước Long B"
                    subText="TP.Thủ Đức, TP.HCM"
                />
            </div>

            {/* Bản đồ */}
            <div className="contact-map-section">
                <h4 className="contact-map-title">Vị trí của chúng tôi</h4>
                <div className="contact-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7477298507824!2d106.77494290000001!3d10.83060760000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701bcd651d7%3A0x2de36f6a719c8aa6!2zMjAgVMSDbmcgTmjGoW4gUGjDuiwgUGjGsOG7m2MgTG9uZyBCLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1746692576925!5m2!1svi!2s"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            <div className="contact-footer">
                <p>Cảm ơn bạn đã ghé thăm Waggy Pet-shop! ❤️</p>
                <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn và thú cưng mọi lúc.</p>
            </div>

        </div>
    );
}

const ContactCard = ({ icon, title, text, subText }) => (
    <div className="contact-card">
        {icon && <i className={`contact-icon ${icon}`}></i>}
        <div className="contact-card-content">
            <h5 className="contact-card-title">{title}</h5>
            <p className="contact-card-text">{text}</p>
            {subText && <small className="contact-card-sub">{subText}</small>}
        </div>
    </div>
);

const InputField = ({ label, type = "text", ...props }) => (
    <div className="input-field">
        <label className="input-label">{label}</label>
        <input type={type} className="input-control" {...props} />
    </div>
);

const TextAreaField = ({ label, ...props }) => (
    <div className="textarea-field">
        <label className="input-label">{label}</label>
        <textarea rows="5" className="input-control" {...props}></textarea>
    </div>
);
