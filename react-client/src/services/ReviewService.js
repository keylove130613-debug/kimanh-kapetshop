import axios from "axios";

const API_URL = "http://localhost:8080/api/reviews";

const ReviewService = {
  getByProduct: (productId) => axios.get(`${API_URL}/${productId}`),

  add: (data) => {
    const token = localStorage.getItem("token"); // lấy token đã lưu khi đăng nhập
    return axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};

export default ReviewService;
