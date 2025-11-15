package com.example.kimanh.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

@Column(nullable = false)
private String name;


    @Column(unique = true, nullable = false)
    private String username;
    
@Column(unique = true, nullable = false)
private String email;

    
    @Column(unique = true, nullable = true)
    private String phone;
    
    @Column(nullable = false)
    private String password;

    private String role; 
    
}
