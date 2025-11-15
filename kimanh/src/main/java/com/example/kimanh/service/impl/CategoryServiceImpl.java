package com.example.kimanh.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.kimanh.dto.CategoryDto;
import com.example.kimanh.entity.Category;
import com.example.kimanh.exception.ResourceNotFoundException;
import com.example.kimanh.mapper.CategoryMapper;
import com.example.kimanh.repository.CategoryRepository;
import com.example.kimanh.service.CategoryService;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
public CategoryDto addCategory(CategoryDto dto) {
    Category parent = null;
    if (dto.getParentId() != null) {
        parent = categoryRepository.findById(dto.getParentId())
                .orElseThrow(() -> new ResourceNotFoundException("Parent category not found"));
    }

    Category category = CategoryMapper.toEntity(dto, parent);
    Category saved = categoryRepository.save(category);
    return CategoryMapper.toDto(saved);
}

@Override
public CategoryDto updateCategory(Integer id, CategoryDto dto) {
    Category existing = categoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

    existing.setName(dto.getName());

    if (dto.getParentId() != null) {
        Category parent = categoryRepository.findById(dto.getParentId())
                .orElseThrow(() -> new ResourceNotFoundException("Parent category not found"));
        existing.setParent(parent);
    } else {
        existing.setParent(null);
    }

    Category updated = categoryRepository.save(existing);
    return CategoryMapper.toDto(updated);
}


    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
public CategoryDto getCategoryById(Integer id) {
    Category category = categoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    return CategoryMapper.toDto(category);
}

@Override
public void deleteCategory(Integer id) {
    if (!categoryRepository.existsById(id)) {
        throw new ResourceNotFoundException("Category not found with id: " + id);
    }
    categoryRepository.deleteById(id);
}

}
