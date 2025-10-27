package com.users.service.impl;

import com.users.entity.User;
import com.users.exception.BadRequestException;
import com.users.exception.NotFoundException;
import com.users.repository.UserRepository;
import com.users.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;



    public List<User> searchUsers(String text) {
        // Treat null or blank search as "fetch all" to support UI behavior of calling with text=""
        if (text == null || text.trim().isEmpty()) {
            return userRepository.findAll();
        }

        // For very short non-empty queries, enforce minimum length 
        if (text.trim().length() < 3) {
            throw new BadRequestException("Query parameter 'text' must be at least 3 characters");
        }

        return userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrSsnContainingIgnoreCase(text, text, text);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found with id " + id));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found with email " + email));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}