package com.example.kimanh.mapper;

import java.util.stream.Collectors;

import com.example.kimanh.dto.OrderDTO;
import com.example.kimanh.dto.OrderItemDTO;
import com.example.kimanh.entity.Order;
import com.example.kimanh.entity.OrderItem;
import com.example.kimanh.entity.Product;

public class OrderMapper {

    private OrderMapper() {} // Ngăn tạo instance

    public static OrderDTO toDTO(Order order) {
        if (order == null) return null;

        return OrderDTO.builder()
                .id(order.getId())
                .userId(order.getUser() != null ? order.getUser().getId().longValue() : null)
                .username(order.getUser() != null ? order.getUser().getUsername() : null)
                .name(order.getName())
                .email(order.getEmail())
                .phone(order.getPhone())
                .address(order.getAddress())
                .subtotal(order.getSubtotal())
                .shippingFee(order.getShippingFee())
                .total(order.getTotal())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .items(order.getItems() != null
                        ? order.getItems().stream()
                            .map(OrderMapper::toItemDTO)
                            .collect(Collectors.toList())
                        : null)
                .build();
    }

    public static OrderItemDTO toItemDTO(OrderItem item) {
        if (item == null) return null;

        Product p = item.getProduct();
        return OrderItemDTO.builder()
                .id(item.getId())
                .productId(p != null ? p.getId() : null)
                .productName(p != null ? p.getName() : "[Sản phẩm đã bị xóa]")
                .image(p != null ? p.getImage() : null)
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .build();
    }
}
