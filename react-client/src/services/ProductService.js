import axios from "axios";
const API = "http://localhost:8080/api/products";

const ProductService = {

  async getAll(params) {
    const res = await axios.get(API, { params });
    const data = res.data;

    async function filter(params) {
      const res = await axios.get(`${API}/filter`, { params });
      return res.data;
    }


    if (data._embedded?.productDtoList) {
      return data._embedded.productDtoList;
    } else if (Array.isArray(data)) {
      return data;
    } else if (Array.isArray(data.content)) {
      return data.content;
    } else {
      return [];
    }
  },


  getById(id) {
    return axios.get(`${API}/${id}`).then(res => res.data);
  },

};

export default ProductService;
