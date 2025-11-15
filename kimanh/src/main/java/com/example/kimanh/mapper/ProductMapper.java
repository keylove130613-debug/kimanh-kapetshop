package com.example.kimanh.mapper;

import com.example.kimanh.dto.ProductDto;
import com.example.kimanh.entity.*;

public class ProductMapper {

    public static ProductDto toDto(Product p) {
        if (p == null) return null;
        return ProductDto.builder()
                .id(p.getId())
                .name(p.getName())
                .description(p.getDescription())
                .price(p.getPrice())
                .quantity(p.getQuantity())
                .image(p.getImage())
                .categoryId(p.getCategory() != null ? p.getCategory().getId() : null)
                .brandId(p.getBrand() != null ? p.getBrand().getId() : null)
                .build();
    }

    public static Product toEntity(ProductDto d, Category category, Brand brand) {
        if (d == null) return null;
        return Product.builder()
                .id(d.getId())
                .name(d.getName())
                .description(d.getDescription())
                .price(d.getPrice())
                .quantity(d.getQuantity())
                .image(d.getImage())
                .category(category)
                .brand(brand)
                .build();
    }
}
