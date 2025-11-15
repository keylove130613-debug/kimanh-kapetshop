package com.example.kimanh.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.kimanh.dto.ProductSizeDto;
import com.example.kimanh.entity.Product;
import com.example.kimanh.entity.ProductSize;
import com.example.kimanh.mapper.ProductSizeMapper;
import com.example.kimanh.repository.ProductRepository;
import com.example.kimanh.repository.ProductSizeRepository;
import com.example.kimanh.service.ProductSizeService;

@Service
@Transactional
public class ProductSizeServiceImpl implements ProductSizeService {
    private final ProductSizeRepository sizeRepo;
    private final ProductRepository productRepo;

    public ProductSizeServiceImpl(ProductSizeRepository sizeRepo, ProductRepository productRepo) {
        this.sizeRepo = sizeRepo;
        this.productRepo = productRepo;
    }

    @Override
    public List<ProductSizeDto> getSizesByProduct(Integer productId) {
        return sizeRepo.findByProductId(productId)
                .stream()
                .map(ProductSizeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductSizeDto addSize(ProductSizeDto dto) {
        Product product = productRepo.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return ProductSizeMapper.toDto(sizeRepo.save(ProductSizeMapper.toEntity(dto, product)));
    }

    @Override
    public void deleteSize(Integer id) {
        sizeRepo.deleteById(id);
    }

    @Override
    public ProductSizeDto updateSize(Integer id, ProductSizeDto dto) {
        ProductSize ps = sizeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Size not found"));
        ps.setSize(dto.getSize());
        ps.setPrice(dto.getPrice());
        return ProductSizeMapper.toDto(sizeRepo.save(ps));
    }
}
