package com.example.kimanh.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kimanh.dto.BrandDto;
import com.example.kimanh.service.BrandService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/brands")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService brandService;

    @GetMapping
    public List<BrandDto> getAll() {
        return brandService.getAll();
    }

    @GetMapping("/{id}")
    public BrandDto getById(@PathVariable Integer id) {
        return brandService.getById(id);
    }

    @PostMapping
    public BrandDto create(@RequestBody BrandDto dto) {
        return brandService.create(dto);
    }

    @PutMapping("/{id}")
    public BrandDto update(@PathVariable Integer id, @RequestBody BrandDto dto) {
        return brandService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        brandService.delete(id);
    }
}
