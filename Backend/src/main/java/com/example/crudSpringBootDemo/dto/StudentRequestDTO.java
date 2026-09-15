package com.example.crudSpringBootDemo.dto;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentRequestDTO {

    @NotBlank(message = "Name cannot be empty")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 100, message = "Age cannot exceed 100")
    private int age;

    @Min(value = 1, message = "Roll Number must be at least 1")
    @Max(value = 100, message = "Roll Number cannot exceed 100")
    private int rollNo;
    
    @NotBlank(message = "Subject Name is required and cannot be blank.")
    @Size(min=2, max=10, message = "Subject name must be between 2 and 10 characters.")
    private String subject;
}
