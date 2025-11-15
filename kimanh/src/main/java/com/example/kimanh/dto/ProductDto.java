package com.example.kimanh.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private Integer id;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private Integer categoryId;
    private Integer brandId; 
    private String image;   
    private List<ProductSizeDto> sizes;

}
