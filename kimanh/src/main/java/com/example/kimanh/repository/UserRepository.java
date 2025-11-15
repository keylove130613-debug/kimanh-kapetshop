package com.example.kimanh.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kimanh.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findByEmail(String email);
}
