package com.users.service;

import com.users.entity.User;
import com.users.exception.BadRequestException;
import com.users.exception.NotFoundException;
import com.users.repository.UserRepository;
import com.users.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void searchUsers_throwsBadRequest_whenTextTooShort_nonEmpty() {
        assertThrows(BadRequestException.class, () -> userService.searchUsers("ab"));
    }

    @Test
    void searchUsers_blankOrNull_returnsAll() {
        User u1 = new User();
        u1.setId(1L);
        when(userRepository.findAll()).thenReturn(List.of(u1));

        // blank string
        List<User> blankResult = userService.searchUsers("  ");
        assertEquals(1, blankResult.size());

        // null
        List<User> nullResult = userService.searchUsers(null);
        assertEquals(1, nullResult.size());
    }

    @Test
    void searchUsers_returnsList_whenValid() {
        User u = new User();
        u.setId(1L);
        when(userRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrSsnContainingIgnoreCase(anyString(), anyString(), anyString()))
                .thenReturn(List.of(u));

        List<User> out = userService.searchUsers("john");
        assertEquals(1, out.size());
        assertEquals(1L, out.get(0).getId());
    }

    @Test
    void getUserById_returnsUser_whenPresent() {
        User u = new User();
        u.setId(42L);
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(u));
        User out = userService.getUserById(42L);
        assertEquals(42L, out.getId());
    }

    @Test
    void getUserById_throwsNotFound_whenMissing() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> userService.getUserById(99L));
    }

    @Test
    void getUserByEmail_throwsNotFound_whenMissing() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> userService.getUserByEmail("x@x.com"));
    }

    @Test
    void getAllUsers_returnsAll() {
        when(userRepository.findAll()).thenReturn(List.of(new User(), new User()));
        assertEquals(2, userService.getAllUsers().size());
    }
}
