import axios from "axios";

const BASE_URL = "http://localhost:8080/api/addresses";

const AddressService = {
  getAddresses: async (username) => {
    const res = await axios.get(`${BASE_URL}/user/${username}`);
    return res.data;
  },

  addAddress: async (username, address) => {
    const res = await axios.post(`${BASE_URL}/user/${username}`, address);
    return res.data;
  },

  updateAddress: async (id, address) => {
    const res = await axios.put(`${BASE_URL}/${id}`, address);
    return res.data;
  },

  deleteAddress: async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  },
};

export default AddressService;
