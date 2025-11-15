package com.example.kimanh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kimanh.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser_Id(Integer userId);
}
