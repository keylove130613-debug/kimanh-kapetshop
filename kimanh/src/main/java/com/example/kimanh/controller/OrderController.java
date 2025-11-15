package com.example.kimanh.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.kimanh.dto.OrderDTO;
import com.example.kimanh.dto.OrderRequest;
import com.example.kimanh.entity.Order;
import com.example.kimanh.mapper.OrderMapper;
import com.example.kimanh.repository.OrderRepository;
import com.example.kimanh.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository; // ✅ thêm dòng này

    @PostMapping("/create")
    public ResponseEntity<String> createOrder(@RequestBody OrderRequest req) {
        orderService.createOrder(req);
        return ResponseEntity.status(HttpStatus.CREATED).body("Đặt hàng thành công!");
    }

    @GetMapping("/user/{userId}")
    public List<OrderDTO> getOrdersByUser(@PathVariable Integer userId) {
        return orderService.getOrdersByUserDTO(userId);
    }

    @GetMapping("/all")
    public Page<OrderDTO> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable)
                .map(OrderMapper::toDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy đơn hàng để xóa!");
        }
        orderRepository.deleteById(id);
        return ResponseEntity.ok("Xóa đơn hàng thành công!");
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
        order.setStatus(status.toUpperCase());
        orderRepository.save(order);
        return ResponseEntity.ok("Cập nhật trạng thái thành công!");
    }

    @GetMapping("/revenue")
    public Double getTotalRevenue() {
        return orderRepository.findAll().stream()
                .filter(o -> "APPROVED".equalsIgnoreCase(o.getStatus()))
                .mapToDouble(Order::getTotal)
                .sum();
    }
    
}
