package com.example.kimanh.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.kimanh.dto.ProductDto;

public interface ProductService {
    ProductDto addProduct(ProductDto dto);
    List<ProductDto> getAllProducts();
    ProductDto getProductById(Integer id);
    ProductDto updateProduct(Integer id, ProductDto dto);
    void deleteProduct(Integer id);
    List<ProductDto> searchByName(String keyword);

    List<ProductDto> searchByPriceRange(Double min, Double max);
    List<ProductDto> searchByCategory(Integer categoryId);
    ProductDto addProductWithImage(String name, Double price, Integer categoryId, Integer brandId, String description, MultipartFile imageFile);
    List<ProductDto> filterProducts(Integer categoryId, Integer brandId, Double minPrice, Double maxPrice, String keyword);

    
    
}
