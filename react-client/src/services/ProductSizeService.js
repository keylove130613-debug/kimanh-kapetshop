import axios from "axios";

const API_URL = "http://localhost:8080/api/product-sizes";

const ProductSizeService = {
  getByProduct: async (productId) => {
    const res = await axios.get(`${API_URL}/product/${productId}`);
    return res.data;
  },
};

export default ProductSizeService;
