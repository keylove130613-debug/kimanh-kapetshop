package com.example.kimanh.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {
    private Integer id;
    private String username;
    private String role;
}
