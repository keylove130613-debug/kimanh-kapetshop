package com.example.kimanh.mapper;

import com.example.kimanh.dto.ProductSizeDto;
import com.example.kimanh.entity.Product;
import com.example.kimanh.entity.ProductSize;

public class ProductSizeMapper {
    public static ProductSizeDto toDto(ProductSize ps) {
        return ProductSizeDto.builder()
                .id(ps.getId())
                .size(ps.getSize())
                .price(ps.getPrice())
                .productId(ps.getProduct().getId())
                .build();
    }

    public static ProductSize toEntity(ProductSizeDto dto, Product product) {
        return ProductSize.builder()
                .id(dto.getId())
                .size(dto.getSize())
                .price(dto.getPrice())
                .product(product)
                .build();
    }
}
