package com.example.kimanh.controller;

import java.util.List;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.kimanh.dto.ProductDto;
import com.example.kimanh.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ProductDto addProduct(
            @RequestParam String name,
            @RequestParam Double price,
            @RequestParam Integer categoryId,
            @RequestParam Integer brandId,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile image) {

        return productService.addProductWithImage(name, price, categoryId, brandId, description, image);
    }

    @GetMapping
    public CollectionModel<EntityModel<ProductDto>> getAllProducts() {
        List<EntityModel<ProductDto>> products = productService.getAllProducts().stream()
                .map(p -> {
                    EntityModel<ProductDto> model = EntityModel.of(p,
                            linkTo(methodOn(ProductController.class).getProductById(p.getId())).withSelfRel(),
                            linkTo(methodOn(ProductController.class).getAllProducts()).withRel("all-products")
                    );
                    if (p.getCategoryId() != null) {
                        try {
                            model.add(linkTo(methodOn(CategoryController.class)
                                    .getCategoryById(p.getCategoryId())).withRel("category"));
                        } catch (Exception e) {
                        }
                    }
                    return model;
                }).toList();

        return CollectionModel.of(products, linkTo(methodOn(ProductController.class).getAllProducts()).withSelfRel());
    }

    @GetMapping("/{id}")
    public EntityModel<ProductDto> getProductById(@PathVariable Integer id) {
        ProductDto product = productService.getProductById(id);

        EntityModel<ProductDto> model = EntityModel.of(product,
                linkTo(methodOn(ProductController.class).getProductById(id)).withSelfRel(),
                linkTo(methodOn(ProductController.class).getAllProducts()).withRel("all-products")
        );

        if (product.getCategoryId() != null) {
            try {
                model.add(linkTo(methodOn(CategoryController.class)
                        .getCategoryById(product.getCategoryId())).withRel("category"));
            } catch (Exception e) {
            }
        }

        return model;
    }

    // UPDATE
    @PutMapping("/{id}")
    public ProductDto updateProduct(@PathVariable Integer id, @RequestBody ProductDto dto) {
        return productService.updateProduct(id, dto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
    }

    // SEARCH
    @GetMapping("/search")
    public List<ProductDto> searchByName(@RequestParam String keyword) {
        return productService.searchByName(keyword);
    }

    // SEARCH theo giá
    @GetMapping("/price-range")
    public List<ProductDto> searchByPriceRange(@RequestParam Double min, @RequestParam Double max) {
        return productService.searchByPriceRange(min, max);
    }

    // SEARCH theo danh mục
    @GetMapping("/category/{id}")
    public List<ProductDto> searchByCategory(@PathVariable Integer id) {
        return productService.searchByCategory(id);
    }
    
}
