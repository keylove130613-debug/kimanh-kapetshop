import axios from "../api/axiosConfig";

const CategoryService = {
  getAll: async () => {
    const res = await axios.get("/categories");
    return res.data;
  },
  getById: async (id) => {
    const res = await axios.get(`/categories/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await axios.post("/categories", data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await axios.put(`/categories/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    await axios.delete(`/categories/${id}`);
  },
};

export default CategoryService;
