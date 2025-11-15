package com.example.kimanh.dto;

import java.util.List;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDto {
    private Integer id;
    private String name;
    private Integer parentId;  
    private List<ProductDto> products;
    private List<CategoryDto> children; 
}
