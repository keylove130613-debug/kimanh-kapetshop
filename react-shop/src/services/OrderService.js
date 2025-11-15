import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

const OrderService = {
  getAll: async () => {
    const res = await axios.get(`${API_URL}/all`);
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },

  updateStatus: async (id, status) => {
    const res = await axios.put(`${API_URL}/${id}/status`, {}, {
      params: { status },
    });
    return res.data;
  },
};

export default OrderService;
