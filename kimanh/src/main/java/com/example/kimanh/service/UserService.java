package com.example.kimanh.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.kimanh.entity.UserEntity;
import com.example.kimanh.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

    public UserEntity register(UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public UserEntity update(Integer id, UserEntity newUser) {
        UserEntity existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        existing.setUsername(newUser.getUsername());
        if (newUser.getPassword() != null && !newUser.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(newUser.getPassword()));
        }
        existing.setRole(newUser.getRole());
        return userRepository.save(existing);
    }

    public void delete(Integer id) {
        userRepository.deleteById(id);
    }
}
