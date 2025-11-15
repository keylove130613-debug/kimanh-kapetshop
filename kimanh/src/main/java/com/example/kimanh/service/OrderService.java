package com.example.kimanh.service;

import java.util.List;

import com.example.kimanh.dto.OrderDTO;
import com.example.kimanh.dto.OrderRequest;

public interface OrderService {
    void createOrder(OrderRequest req);
    List<OrderDTO> getOrdersByUserDTO(Integer userId);
    List<OrderDTO> getAllOrders();
}
