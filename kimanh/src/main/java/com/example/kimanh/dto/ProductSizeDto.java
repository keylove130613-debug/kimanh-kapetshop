package com.example.kimanh.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSizeDto {
    private Integer id;
    private String size;
    private Double price;
    private Integer productId;
}
