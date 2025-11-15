package com.example.kimanh.mapper;

import com.example.kimanh.dto.CategoryDto;
import com.example.kimanh.entity.Category;

public class CategoryMapper {
    
    public static CategoryDto toDto(Category c) {
        if (c == null) return null;
        return CategoryDto.builder()
                .id(c.getId())
                .name(c.getName())
                .parentId(c.getParent() != null ? c.getParent().getId() : null)
                .build();
    }

    public static Category toEntity(CategoryDto d, Category parent) {
        if (d == null) return null;
        return Category.builder()
                .id(d.getId())
                .name(d.getName())
                .parent(parent)
                .build();
    }
}
