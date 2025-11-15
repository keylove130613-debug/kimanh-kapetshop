package com.example.kimanh.controller;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kimanh.dto.CategoryDto;
import com.example.kimanh.service.CategoryService;


@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public CategoryDto addCategory(@RequestBody CategoryDto dto) {
        return categoryService.addCategory(dto);
    }

    @GetMapping
    public List<CategoryDto> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public CategoryDto getCategoryById(@PathVariable Integer id) {
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public CategoryDto updateCategory(@PathVariable Integer id, @RequestBody CategoryDto dto) {
        return categoryService.updateCategory(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
    }
}
