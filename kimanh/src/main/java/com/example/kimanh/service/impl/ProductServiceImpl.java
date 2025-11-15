package com.example.kimanh.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.kimanh.dto.ProductDto;
import com.example.kimanh.entity.Brand;
import com.example.kimanh.entity.Category;
import com.example.kimanh.entity.Product;
import com.example.kimanh.exception.ResourceNotFoundException;
import com.example.kimanh.mapper.ProductMapper;
import com.example.kimanh.repository.BrandRepository;
import com.example.kimanh.repository.CategoryRepository;
import com.example.kimanh.repository.ProductRepository;
import com.example.kimanh.service.ProductService;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

     @Value("${product.image.upload-dir}")
    private String uploadDirConfig;

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    public ProductServiceImpl(ProductRepository productRepository, 
                              CategoryRepository categoryRepository,
                              BrandRepository brandRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.brandRepository = brandRepository;
    }

    @Override
    public ProductDto addProduct(ProductDto dto) {
        Category category = null;
        if (dto.getCategoryId() != null) {
            category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Category not found with id: " + dto.getCategoryId()));
        }

        Brand brand = null;
        if (dto.getBrandId() != null) {
            brand = brandRepository.findById(dto.getBrandId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Brand not found with id: " + dto.getBrandId()));
        }

        Product saved = productRepository.save(ProductMapper.toEntity(dto, category, brand));
        return ProductMapper.toDto(saved);
    }

    @Override
    public ProductDto updateProduct(Integer id, ProductDto dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        existing.setName(dto.getName());
        existing.setDescription(dto.getDescription());
        existing.setPrice(dto.getPrice());
        existing.setQuantity(dto.getQuantity());
        existing.setImage(dto.getImage());

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Category not found with id: " + dto.getCategoryId()));
            existing.setCategory(category);
        }

        if (dto.getBrandId() != null) {
            Brand brand = brandRepository.findById(dto.getBrandId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Brand not found with id: " + dto.getBrandId()));
            existing.setBrand(brand);
        }

        Product updated = productRepository.save(existing);
        return ProductMapper.toDto(updated);
    }
    

@Override
public ProductDto addProductWithImage(String name, Double price, Integer categoryId, Integer brandId,
                                      String description, MultipartFile image) {

    Product product = new Product();
    product.setName(name);
    product.setPrice(price);
    product.setDescription(description);
    product.setQuantity(0); 
    Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    Brand brand = brandRepository.findById(brandId)
            .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));

    product.setCategory(category);
    product.setBrand(brand);

    if (image != null && !image.isEmpty()) {
        try {
            Path uploadDir = Paths.get(uploadDirConfig);
            Files.createDirectories(uploadDir);

            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path filePath = uploadDir.resolve(fileName);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            product.setImage("/uploads/products/" + fileName);
        } catch (IOException e) {
            throw new RuntimeException("Upload image failed: " + e.getMessage());
        }
    }

    productRepository.save(product);
    return ProductMapper.toDto(product);
}
@Override
public List<ProductDto> getAllProducts() {
    return productRepository.findAll()
            .stream()
            .filter(p -> !p.isDeleted()) // chỉ lấy sản phẩm chưa xóa
            .map(ProductMapper::toDto)
            .collect(Collectors.toList());
}


@Override
public ProductDto getProductById(Integer id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    return ProductMapper.toDto(product);
}

@Override
public void deleteProduct(Integer id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

    product.setDeleted(true);
    productRepository.save(product);
}



@Override
public List<ProductDto> searchByName(String keyword) {
    return productRepository.findByNameContainingIgnoreCase(keyword)
            .stream()
            .map(ProductMapper::toDto)
            .collect(Collectors.toList());
}

@Override
public List<ProductDto> searchByPriceRange(Double min, Double max) {
    return productRepository.findByPriceBetween(min, max)
            .stream()
            .map(ProductMapper::toDto)
            .collect(Collectors.toList());
}

@Override
public List<ProductDto> searchByCategory(Integer categoryId) {
    Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
    return productRepository.findByCategory(category)
            .stream()
            .map(ProductMapper::toDto)
            .collect(Collectors.toList());
}
@Override
public List<ProductDto> filterProducts(Integer categoryId, Integer brandId, Double minPrice, Double maxPrice, String keyword) {
    List<Product> products = productRepository.findAll();

    return products.stream()
            .filter(p -> categoryId == null || 
                         (p.getCategory() != null && p.getCategory().getId().equals(categoryId)))
            .filter(p -> brandId == null || 
                         (p.getBrand() != null && p.getBrand().getId().equals(brandId)))
            .filter(p -> minPrice == null || (p.getPrice() != null && p.getPrice() >= minPrice))
            .filter(p -> maxPrice == null || (p.getPrice() != null && p.getPrice() <= maxPrice))
            .filter(p -> keyword == null || p.getName().toLowerCase().contains(keyword.toLowerCase()))
            .map(ProductMapper::toDto)
            .collect(Collectors.toList());
}




}
