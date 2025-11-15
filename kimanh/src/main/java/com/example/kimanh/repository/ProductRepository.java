package com.example.kimanh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kimanh.entity.Category;
import com.example.kimanh.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameContainingIgnoreCase(String keyword);
    // Tìm sản phẩm theo giá
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);

    //Tìm sản phẩm theo danh mục
    List<Product> findByCategoryId(Integer categoryId);
    
    List<Product> findByCategory(Category category);
    // List<Product> findByCategory(Locale.Category category);

}
