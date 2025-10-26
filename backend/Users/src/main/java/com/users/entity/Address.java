package com.users.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.Data;

@Embeddable
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Address {
    private String address;
    private String city;
    private String state;
    private String stateCode;
    private String postalCode;
    private String country;


    @Embedded
    private Coordinates coordinates;
}
