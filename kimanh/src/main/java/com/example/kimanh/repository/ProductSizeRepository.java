package com.example.kimanh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kimanh.entity.ProductSize;

public interface ProductSizeRepository extends JpaRepository<ProductSize, Integer> {
    List<ProductSize> findByProductId(Integer productId);
}
