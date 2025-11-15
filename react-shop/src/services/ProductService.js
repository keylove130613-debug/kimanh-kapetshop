import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

const ProductService = {
  getAll: async () => {
    const res = await axios.get(API_URL);
    // Lấy danh sách thật trong HATEOAS response
    return res.data._embedded?.productDtoList || [];
  },

  getById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  create: async (data, isFormData = false) => {
    const config = isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};
    const res = await axios.post(API_URL, data, config);
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

export default ProductService;

// ProductSizeService.java → interface, đầy đủ các method.

// ProductSizeServiceImpl.java → implement, đúng repository, có update.

// ProductSizeRepository.java → riêng, không nested, đúng chuẩn Spring Data JPA.

// ProductSizeMapper.java → mapper DTO ↔ entity.

// ProductSize.java → entity với quan hệ ManyToOne tới Product.

// ProductSizeDto.java → DTO dùng cho controller.

// ProductSizeController.java → REST API đầy đủ CRUD, có @CrossOrigin cho frontend React.