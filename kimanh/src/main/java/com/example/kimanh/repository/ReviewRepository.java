package com.example.kimanh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kimanh.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductIdOrderByCreatedAtDesc(Long productId);
}