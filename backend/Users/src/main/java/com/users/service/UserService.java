package com.users.service;

import com.users.entity.User;

import java.util.List;

public interface UserService {
    public List<User> searchUsers(String text);

    public User getUserById(Long id);

    public User getUserByEmail(String email);

    public List<User> getAllUsers();
}
