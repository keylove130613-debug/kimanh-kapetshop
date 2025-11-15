// src/services/UserService.js
import axios from "axios";

const AUTH_API = "http://localhost:8080/api/auth";
const USER_API = "http://localhost:8080/api/users";

const UserService = {
  // === Dành cho user frontend ===
  login: async ({ username, password }) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    const res = await axios.post(`${AUTH_API}/login`, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return res.data;
  },

  register: async ({ name, username, email, phone, password }) => {
    const res = await axios.post("http://localhost:8080/api/auth/register", {
      name,
      username,
      email,
      phone,
      password,
    }, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },

 // ✅ Lấy thông tin user theo username
  getProfile: async (username) => {
    const res = await axios.get(`${USER_API}/profile/${username}`);
    return res.data;
  },

  // ✅ Cập nhật hồ sơ
  updateProfile: async (username, data) => {
    const res = await axios.put(`${USER_API}/update/${username}`, data);
    return res.data;
  },

  // ✅ Đổi mật khẩu
  changePassword: async (username, oldPassword, newPassword) => {
    const res = await axios.put(`${USER_API}/change-password/${username}`, {
      oldPassword,
      newPassword,
    });
    return res.data;
  },

  // === Dành cho admin ===
  getAll: async () => {
    const res = await axios.get(`${USER_API}`);
    return res.data;
  },

  adminRegister: async (user) => {
    const res = await axios.post(`${USER_API}/register`, user); // JSON body
    return res.data;
  },

  delete: async (id) => {
    await axios.delete(`${USER_API}/${id}`);
  },



  getToken: () => localStorage.getItem("token"),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }
};


export default UserService;
