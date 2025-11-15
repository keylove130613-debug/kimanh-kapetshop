import axios from "../api/axiosConfig";

const BrandService = {
  getAll: async () => {
    const res = await axios.get("/brands");
    return res.data;
  },
  getById: async (id) => {
    const res = await axios.get(`/brands/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await axios.post("/brands", data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await axios.put(`/brands/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    await axios.delete(`/brands/${id}`);
  },
};

export default BrandService;
