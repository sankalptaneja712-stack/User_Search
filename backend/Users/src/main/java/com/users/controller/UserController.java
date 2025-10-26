package com.users.controller;

import com.users.entity.User;
import com.users.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping
    public List<User> getAll() {
        return userService.searchUsers("");
    }


    @GetMapping("/search")
    public List<User> search(@RequestParam String text) {
        return userService.searchUsers(text);
    }


    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.getUserById(id);
    }


    @GetMapping("/email/{email}")
    public User getByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }
}
