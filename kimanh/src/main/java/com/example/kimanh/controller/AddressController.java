package com.example.kimanh.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kimanh.entity.Address;
import com.example.kimanh.service.AddressService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    // Lấy danh sách địa chỉ của user
    @GetMapping("/user/{username}")
    public List<Address> getUserAddresses(@PathVariable String username) {
        return addressService.getAddressesByUser(username);
    }

    // Thêm địa chỉ mới
    @PostMapping("/user/{username}")
    public Address addAddress(@PathVariable String username, @RequestBody Address addr) {
        return addressService.addAddress(username, addr);
    }

    // Cập nhật địa chỉ
    @PutMapping("/{id}")
    public Address updateAddress(@PathVariable Long id, @RequestBody Address addr) {
        return addressService.updateAddress(id, addr);
    }

    // Xóa địa chỉ
    @DeleteMapping("/{id}")
    public String deleteAddress(@PathVariable Long id) {
        addressService.deleteAddress(id);
        return "Địa chỉ đã được xóa!";
    }
}
