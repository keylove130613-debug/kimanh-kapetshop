package com.example.kimanh.service;

import java.util.List;

import com.example.kimanh.dto.ProductSizeDto;

public interface ProductSizeService {
    List<ProductSizeDto> getSizesByProduct(Integer productId);
    ProductSizeDto addSize(ProductSizeDto dto);
    ProductSizeDto updateSize(Integer id, ProductSizeDto dto);
    void deleteSize(Integer id);
}
