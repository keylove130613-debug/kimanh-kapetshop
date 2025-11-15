package com.example.kimanh.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kimanh.entity.UserEntity;
import com.example.kimanh.repository.UserRepository;
import com.example.kimanh.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // === ADMIN ===
    @GetMapping
    public List<UserEntity> getAll() {
        return userService.getAll();
    }

    @PostMapping("/register")
    public UserEntity register(@RequestBody UserEntity user) {
        return userService.register(user);
    }

    @PutMapping("/{id}")
    public UserEntity update(@PathVariable Integer id, @RequestBody UserEntity user) {
        return userService.update(id, user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        userService.delete(id);
    }


    
    @GetMapping("/profile/{username}")
    public UserEntity getProfile(@PathVariable String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    // chiinhr sửa
    @PutMapping("/update/{username}")
    public String updateProfile(@PathVariable String username, @RequestBody UserEntity update) {
        Optional<UserEntity> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) return "User not found!";

        UserEntity user = optionalUser.get();
        user.setName(update.getName());
        user.setEmail(update.getEmail());
        user.setPhone(update.getPhone());
        userRepository.save(user);

        return "Cập nhật thông tin thành công!";
    }

    //  Đổi mk
    @PutMapping("/change-password/{username}")
    public String changePassword(@PathVariable String username, @RequestBody PasswordChangeRequest req) {
        Optional<UserEntity> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) return "User not found!";

        UserEntity user = optionalUser.get();
        if (!passwordEncoder.matches(req.oldPassword(), user.getPassword())) {
            return "Old password is incorrect!";
        }

        user.setPassword(passwordEncoder.encode(req.newPassword()));
        userRepository.save(user);
        return "Password changed successfully!";
    }
    public record PasswordChangeRequest(String oldPassword, String newPassword) {}
}
