import axios from "axios";

const API_URL = "http://localhost:8080/api/product-sizes";

const ProductSizeService = {
  getByProduct: async (productId) => {
    const res = await axios.get(`${API_URL}/product/${productId}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(API_URL, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },
};

export default ProductSizeService;
