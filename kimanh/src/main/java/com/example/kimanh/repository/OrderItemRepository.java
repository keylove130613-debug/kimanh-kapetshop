package com.example.kimanh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kimanh.entity.OrderItem;
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
