package com.users.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    private Long id;
    private String firstName;
    private String lastName;
    private String maidenName;
    private Integer age;
    private String gender;
    private String email;
    private String phone;
    private String username;
    private String password;
    private String birthDate;
    private String image;
    private String bloodGroup;
    private Double height;
    private Double weight;
    private String eyeColor;
    private String ip;
    private String macAddress;
    private String university;
    private String ein;
    private String ssn;
    private String userAgent;
    private String role;


    @Embedded
    private Hair hair;
    @Embedded
    private Address address;
    @Embedded
    private Bank bank;
    @Embedded
    private Company company;
    @Embedded
    private Crypto crypto;


}
