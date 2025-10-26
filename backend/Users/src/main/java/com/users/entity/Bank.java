package com.users.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Bank {
    private String cardExpire, cardNumber, cardType, currency, iban;
}