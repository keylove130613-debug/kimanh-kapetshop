import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const UserService = {
  getAll: async () => {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
  },

register: async (user) => {
  const res = await axios.post(`${API_URL}/register`, user, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
},


delete: async (id) => {
  await axios.delete(`http://localhost:8080/api/users/${id}`);
},



};

export default UserService;
