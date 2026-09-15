package com.example.crudSpringBootDemo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentResponseDTO {
    private Long id;
    private String name;
    private String email;
    private int age;
    private String subject;
    private int rollNo;
}
