package com.users.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.users.entity.User;
import com.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataLoaderService implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RestTemplate restTemplate;

    private final ObjectMapper objectMapper = new ObjectMapper();


    @Value("${external.api.users}")
    private String externalApiUrl;


    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) loadUsersFromExternalApi();
    }


    private void loadUsersFromExternalApi() {
        try {
            JsonNode users = restTemplate.getForEntity(externalApiUrl, JsonNode.class).getBody().get("users");
            List<User> userList = new ArrayList<>();
            for (JsonNode node : users) userList.add(objectMapper.treeToValue(node, User.class));
            userRepository.saveAll(userList);
            System.out.println("✅ Loaded " + userList.size() + " users into H2 DB.");
        } catch (Exception e) {
            System.err.println("❌ Error loading users: " + e.getMessage());
        }
    }
}