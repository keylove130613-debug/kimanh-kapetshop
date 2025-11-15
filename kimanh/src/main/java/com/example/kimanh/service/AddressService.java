package com.example.kimanh.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kimanh.entity.Address;
import com.example.kimanh.entity.UserEntity;
import com.example.kimanh.repository.AddressRepository;
import com.example.kimanh.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public List<Address> getAddressesByUser(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return addressRepository.findByUser(user);
    }

    public Address addAddress(String username, Address addr) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        addr.setUser(user);

        // Nếu địa chỉ mới được đánh dấu mặc định, reset các địa chỉ khác
        if (addr.isDefaultAddress()) {
            List<Address> addresses = addressRepository.findByUser(user);
            for (Address a : addresses) {
                a.setDefaultAddress(false);
            }
            addressRepository.saveAll(addresses);
        }

        return addressRepository.save(addr);
    }

    public Address updateAddress(Long id, Address addr) {
        Address existing = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        existing.setReceiverName(addr.getReceiverName());
        existing.setPhone(addr.getPhone());
        existing.setAddressLine(addr.getAddressLine());
        existing.setNote(addr.getNote());

        // Nếu cập nhật thành mặc định, reset các địa chỉ khác
        if (addr.isDefaultAddress()) {
            UserEntity user = existing.getUser();
            List<Address> addresses = addressRepository.findByUser(user);
            for (Address a : addresses) {
                if (!a.getId().equals(id)) {
                    a.setDefaultAddress(false);
                }
            }
            addressRepository.saveAll(addresses);
        }

        existing.setDefaultAddress(addr.isDefaultAddress());
        return addressRepository.save(existing);
    }

    public void deleteAddress(Long id) {
        if (!addressRepository.existsById(id))
            throw new RuntimeException("Address not found");
        addressRepository.deleteById(id);
    }
}
