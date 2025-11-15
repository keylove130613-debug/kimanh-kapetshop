import axios from "axios";

const BASE_URL = "http://localhost:8080/api/orders";

const OrderService = {
  createOrder: async (orderData) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${BASE_URL}/create`, orderData, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return res.data;
  },
};

export default OrderService;
