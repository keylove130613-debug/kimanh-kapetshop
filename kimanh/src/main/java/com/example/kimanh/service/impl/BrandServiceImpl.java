package com.example.kimanh.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.kimanh.dto.BrandDto;
import com.example.kimanh.entity.Brand;
import com.example.kimanh.exception.ResourceNotFoundException;
import com.example.kimanh.mapper.BrandMapper;
import com.example.kimanh.repository.BrandRepository;
import com.example.kimanh.service.BrandService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    @Override
    public List<BrandDto> getAll() {
        return brandRepository.findAll()
                .stream()
                .map(BrandMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public BrandDto getById(Integer id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id: " + id));
        return BrandMapper.toDto(brand);
    }

    @Override
    public BrandDto create(BrandDto dto) {
        Brand brand = BrandMapper.toEntity(dto);
        return BrandMapper.toDto(brandRepository.save(brand));
    }

    @Override
    public BrandDto update(Integer id, BrandDto dto) {
        Brand existing = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id: " + id));

        existing.setName(dto.getName());
        existing.setImage(dto.getImage());
        existing.setDescription(dto.getDescription());

        return BrandMapper.toDto(brandRepository.save(existing));
    }

    @Override
    public void delete(Integer id) {
        brandRepository.deleteById(id);
    }
}
