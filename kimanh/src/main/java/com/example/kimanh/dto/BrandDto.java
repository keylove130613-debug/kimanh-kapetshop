package com.example.kimanh.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BrandDto {
    private Integer id;
    private String name;
    private String image;
    private String description;
}
