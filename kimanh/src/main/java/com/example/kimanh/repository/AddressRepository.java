package com.example.kimanh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kimanh.entity.Address;
import com.example.kimanh.entity.UserEntity;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUser(UserEntity user);
}
