package com.example.kimanh.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.kimanh.dto.OrderDTO;
import com.example.kimanh.dto.OrderRequest;
import com.example.kimanh.entity.Order;
import com.example.kimanh.entity.OrderItem;
import com.example.kimanh.entity.Product;
import com.example.kimanh.entity.UserEntity;
import com.example.kimanh.mapper.OrderMapper;
import com.example.kimanh.repository.OrderRepository;
import com.example.kimanh.repository.ProductRepository;
import com.example.kimanh.repository.UserRepository;
import com.example.kimanh.service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public void createOrder(OrderRequest req) {
        UserEntity user = userRepository.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        Order order = new Order();
        order.setUser(user);
        order.setName(req.getName());
        order.setEmail(req.getEmail());
        order.setPhone(req.getPhone());
        order.setAddress(req.getAddress());
        order.setShippingFee(req.getShippingFee());
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus("PENDING");

        List<OrderItem> items = req.getItems().stream().map(i -> {
            OrderItem item = new OrderItem();
            Product product = productRepository.findById(i.getProductId())
                    .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại: " + i.getProductId()));
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(i.getQuantity());
            item.setPrice(product.getPrice());
            return item;
        }).collect(Collectors.toList());

        double subtotal = items.stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum();
        order.setSubtotal(subtotal);
        order.setTotal(subtotal + order.getShippingFee());
        order.setItems(items);

        orderRepository.save(order);
    }

    @Override
    public List<OrderDTO> getOrdersByUserDTO(Integer userId) {
        return orderRepository.findByUser_Id(userId).stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }
}
