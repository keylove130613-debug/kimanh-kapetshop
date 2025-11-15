package com.example.kimanh.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.kimanh.service.impl.UserDetailsServiceImpl;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;

    @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
    .csrf(csrf -> csrf.disable())
    .cors(cors -> {}) 
    .authorizeHttpRequests(auth -> auth
        .requestMatchers(
            "/api/auth/**",
            "/api/users/**",
            "/api/products/**",
            "/api/categories/**",
            "/api/brands/**",
             "/api/product-sizes/**",
            "/api/menus/**",
            "/api/reviews/**",
            "/api/banners/**",
            "/api/contacts/**",
            "/uploads/**",
            "/api/orders/create",
            "/api/orders/all",
            "/api/addresses/**",
            "/api/orders/**"
        ).permitAll()
        .requestMatchers(
            "/api/orders/user/**",
            "/api/users/profile"
        ).authenticated()
        .anyRequest().authenticated()
    )
    .formLogin(login -> login.disable())
    .httpBasic(basic -> basic.disable());


    return http.build();
}



    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
