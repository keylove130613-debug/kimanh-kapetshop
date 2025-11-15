import axios from "axios";
const API = "http://localhost:8080/api/categories";

const CategoryService = {
  getAll() {
    return axios.get(API);
  },
};

export default CategoryService;
