// src/main/java/com/example/kimanh/dto/OrderRequest.java
package com.example.kimanh.dto;

import java.util.List;

import lombok.Data;

@Data
public class OrderRequest {
   private Integer userId;
private String name;
private String email;
private String phone;
private String address;
private Double subtotal;
private Double shippingFee;
private Double total;
private String note;
private List<OrderItemDTO> items;

}
