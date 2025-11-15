package com.example.kimanh.service;

import java.util.List;

import com.example.kimanh.dto.CategoryDto;

public interface CategoryService {
    CategoryDto addCategory(CategoryDto dto);
    List<CategoryDto> getAllCategories();
    CategoryDto getCategoryById(Integer id);
    CategoryDto updateCategory(Integer id, CategoryDto dto);
    void deleteCategory(Integer id);
}


