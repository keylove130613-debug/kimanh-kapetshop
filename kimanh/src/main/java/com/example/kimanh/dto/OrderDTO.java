package com.example.kimanh.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;
    private Long userId;
    private String username;
    private String name;
    private String email;
    private String phone;
    private String address;
    private Double subtotal;
    private Double shippingFee;
    private Double total;
    private String status;
    private LocalDateTime createdAt;
    private List<OrderItemDTO> items;
}
