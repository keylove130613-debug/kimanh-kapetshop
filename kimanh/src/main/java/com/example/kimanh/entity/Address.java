package com.example.kimanh.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "addresses")
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String receiverName;
    private String phone;
    private String addressLine;
    private String note;

@Column(name = "default_address", nullable = false)
private boolean defaultAddress;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
