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

import com.example.kimanh.dto.ProductSizeDto;
import com.example.kimanh.service.ProductSizeService;

@RestController
@RequestMapping("/api/product-sizes")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductSizeController {
    private final ProductSizeService service;

    public ProductSizeController(ProductSizeService service) {
        this.service = service;
    }

    @GetMapping("/product/{productId}")
    public List<ProductSizeDto> getSizesByProduct(@PathVariable Integer productId) {
        return service.getSizesByProduct(productId);
    }

    @PostMapping
    public ProductSizeDto addSize(@RequestBody ProductSizeDto dto) {
        return service.addSize(dto);
    }

    @DeleteMapping("/{id}")
    public void deleteSize(@PathVariable Integer id) {
        service.deleteSize(id);
    }

    @PutMapping("/{id}")
    public ProductSizeDto updateSize(@PathVariable Integer id, @RequestBody ProductSizeDto dto) {
        return service.updateSize(id, dto);
    }
}
