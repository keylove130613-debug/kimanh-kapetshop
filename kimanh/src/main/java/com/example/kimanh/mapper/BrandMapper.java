package com.example.kimanh.mapper;

import com.example.kimanh.dto.BrandDto;
import com.example.kimanh.entity.Brand;

public class BrandMapper {
    public static BrandDto toDto(Brand b) {
        if (b == null) return null;
        return BrandDto.builder()
                .id(b.getId())
                .name(b.getName())
                .image(b.getImage())
                .description(b.getDescription())
                .build();
    }

    public static Brand toEntity(BrandDto dto) {
        if (dto == null) return null;
        return Brand.builder()
                .id(dto.getId())
                .name(dto.getName())
                .image(dto.getImage())
                .description(dto.getDescription())
                .build();
    }
}
