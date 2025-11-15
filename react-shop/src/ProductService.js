import axios from "../api/axiosConfig";

const ProductService = {
  // Lấy tất cả sản phẩm
  getAll: async () => {
    try {
      const res = await axios.get("/products");
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  // Lấy sản phẩm theo ID
  getById: async (id) => {
    try {
      const res = await axios.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  // Thêm sản phẩm
  create: async (data) => {
    try {
      const res = await axios.post("/products", data);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  // Cập nhật sản phẩm
  update: async (id, data) => {
    try {
      const res = await axios.put(`/products/${id}`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  // Xóa sản phẩm
  delete: async (id) => {
    try {
      await axios.delete(`/products/${id}`);
    } catch (err) {
      throw err;
    }
  },

  // --- 3 Truy vấn nâng cao ---
  //  Tìm theo tên
  searchByName: async (name) => {
    const res = await axios.get(`/products/search?name=${name}`);
    return res.data;
  },

  //  Lọc theo khoảng giá
  filterByPrice: async (min, max) => {
    const res = await axios.get(`/products/price?min=${min}&max=${max}`);
    return res.data;
  },

  // Tìm theo danh mục
  findByCategory: async (categoryId) => {
    const res = await axios.get(`/products/category/${categoryId}`);
    return res.data;
  },
};

export default ProductService;
