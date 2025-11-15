package com.example.kimanh.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kimanh.entity.Review;
import com.example.kimanh.repository.ReviewRepository;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> getByProductId(Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
    }

    public Review save(Review review) {
        return reviewRepository.save(review);
    }
}