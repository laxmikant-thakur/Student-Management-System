package com.example.crudSpringBootDemo.mapper;

import com.example.crudSpringBootDemo.dto.StudentRequestDTO;
import com.example.crudSpringBootDemo.dto.StudentResponseDTO;
import com.example.crudSpringBootDemo.entity.Student;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {

    public Student dtoToEntity(StudentRequestDTO dto) {
        Student student = new Student();

        student.setName(dto.getName());
        student.setAge(dto.getAge());
        student.setEmail(dto.getEmail());
        student.setRollNo(dto.getRollNo());
        student.setSubject(dto.getSubject());

        return student;
    }

    public StudentResponseDTO entityToDto(Student student) {
        StudentResponseDTO dto = new StudentResponseDTO();

        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setAge(student.getAge());
        dto.setEmail(student.getEmail());
        dto.setRollNo(student.getRollNo());
        dto.setSubject(student.getSubject());

        return dto;
    }
}
