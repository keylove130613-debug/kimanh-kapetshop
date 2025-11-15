import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const AuthService = {
  login: async (username, password) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    const res = await axios.post(`${API_URL}/login`, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { token, role, username: name } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", name);

    return res.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  },

  getToken: () => localStorage.getItem("token"),
};

export default AuthService;
