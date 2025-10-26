package com.users.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Crypto {
    private String coin, wallet, network;
}