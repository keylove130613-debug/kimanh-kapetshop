import axios from "axios";

const API = "http://localhost:8080/api/brands";

const BrandService = {
  getAll() {
    return axios.get(API);
  },
};

export default BrandService;
