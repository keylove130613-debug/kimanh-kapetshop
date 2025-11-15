package com.example.kimanh.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController; // ✅ sửa lại import này

import com.example.kimanh.dto.UserDTO;
import com.example.kimanh.entity.UserEntity;
import com.example.kimanh.repository.UserRepository;
import com.example.kimanh.security.JwtTokenUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil; 

    // Đăng nhập
    @PostMapping("/login")
    public java.util.Map<String, String> login(@RequestParam String username, @RequestParam String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtTokenUtil.generateToken(user.getUsername(), user.getRole());
        return java.util.Map.of(
                "token", token,
                "role", user.getRole(),
                "username", user.getUsername()
        );
    }

    // Lấy danh sách user
    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getRole()))
                .collect(Collectors.toList());
    }

    // Đăng ký
    @PostMapping("/register")
public String register(@RequestBody UserEntity newUser) {
    if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
        return "Username already exists!";
    }

    // ⚠️ Chỉ kiểm tra trùng email nếu người dùng nhập email
    if (newUser.getEmail() != null && !newUser.getEmail().isBlank()) {
        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return "Email already exists!";
        }
    }

    newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
    newUser.setRole("USER");

    userRepository.save(newUser);
    return "Register successful!";
}

}
