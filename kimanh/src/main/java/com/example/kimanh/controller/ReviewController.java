package com.example.kimanh.controller;


import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kimanh.entity.Review;
import com.example.kimanh.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/{productId}")
    public List<Review> getByProductId(@PathVariable Long productId) {
        return reviewService.getByProductId(productId);
    }

    @PostMapping
    public Review create(@RequestBody Review review) {
        return reviewService.save(review);
    }
}
