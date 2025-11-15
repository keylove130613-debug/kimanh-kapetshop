package com.example.kimanh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kimanh.entity.Brand;

public interface BrandRepository extends JpaRepository<Brand, Integer> {
}
