package com.users.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.users.entity.User;
import com.users.exception.BadRequestException;
import com.users.exception.GlobalExceptionHandler;
import com.users.exception.NotFoundException;
import com.users.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UserController.class)
@Import(GlobalExceptionHandler.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @Test
    @DisplayName("GET /api/v1/users returns 200 with list")
    void getAll_returnsOk() throws Exception {
        User u = new User();
        u.setId(1L);
        when(userService.getAllUsers()).thenReturn(List.of(u));

    mockMvc.perform(get("/api/v1/users").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    @DisplayName("GET /api/v1/users/search with short text returns 400 ApiError")
    void search_shortText_returnsBadRequest() throws Exception {
        when(userService.searchUsers(anyString())).thenThrow(new BadRequestException("Query parameter 'text' must be at least 3 characters"));

        mockMvc.perform(get("/api/v1/users/search").param("text", "ab"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.message").value("Query parameter 'text' must be at least 3 characters"))
                .andExpect(jsonPath("$.path").value("/api/v1/users/search"));
    }

    @Test
    @DisplayName("GET /api/v1/users/{id} not found returns 404 ApiError")
    void getById_notFound_returns404() throws Exception {
        when(userService.getUserById(anyLong())).thenThrow(new NotFoundException("User not found with id 99"));

        mockMvc.perform(get("/api/v1/users/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("User not found with id 99"));
    }

    @Test
    @DisplayName("GET /api/v1/users/{id} returns 200 with user")
    void getById_returnsUser() throws Exception {
        User u = new User();
        u.setId(7L);
        when(userService.getUserById(7L)).thenReturn(u);

        mockMvc.perform(get("/api/v1/users/7"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(7));
    }
}
