package com.example.kimanh.mapper;

import com.example.kimanh.dto.UserDTO;
import com.example.kimanh.entity.UserEntity;

public class UserMapper {
    public static UserDTO toDto(UserEntity entity) {
        return new UserDTO(
                entity.getId(),
                entity.getUsername(),
                entity.getRole()
        );
    }
}
