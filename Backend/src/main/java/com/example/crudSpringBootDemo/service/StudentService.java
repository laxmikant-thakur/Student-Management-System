package com.example.crudSpringBootDemo.service;

import com.example.crudSpringBootDemo.dto.StudentRequestDTO;
import com.example.crudSpringBootDemo.dto.StudentResponseDTO;
import com.example.crudSpringBootDemo.entity.Student;
import com.example.crudSpringBootDemo.exception.DuplicateEntityException;
import com.example.crudSpringBootDemo.exception.StudentNotFoundException;
import com.example.crudSpringBootDemo.mapper.StudentMapper;
import com.example.crudSpringBootDemo.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;

    public StudentService(StudentRepository studentRepository, StudentMapper studentMapper) {
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
    }
    public StudentResponseDTO createStudent(StudentRequestDTO studentReq) {
        //business logic
        if(studentRepository.existsByEmail(studentReq.getEmail())) {
            throw new DuplicateEntityException("Student already exists.");
        }

        Student student;
        student = studentMapper.dtoToEntity(studentReq);
        student.setDeleted(false);

        Student studentResp = studentRepository.save(student);

        StudentResponseDTO dto;
        dto = studentMapper.entityToDto(studentResp);

        return dto;
    }

    public StudentResponseDTO getStudent(Long id) {
        Student studentResp = studentRepository.findByIdAndDeletedIsFalse(id).
                orElseThrow(() -> new StudentNotFoundException("Student Not Found with id: " + id));

            StudentResponseDTO dto = new StudentResponseDTO();
            dto = studentMapper.entityToDto(studentResp);
            return dto;
    }

    public List<StudentResponseDTO> getAllStudents(int page, int size, String sortBy, String direction) {

        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Student> studentPage =  studentRepository
                                    .findByDeletedIsFalse(pageable);

        if (studentPage.isEmpty()) {
            throw new StudentNotFoundException("No student records found in the system.");
        }

        List<StudentResponseDTO> dtoList = new ArrayList<>();

        for(Student student : studentPage.getContent()) {
            StudentResponseDTO dto = studentMapper.entityToDto(student);
            dtoList.add(dto);
        }
        return dtoList;
    }

    public StudentResponseDTO updateStudent(Long id,  StudentRequestDTO studentReq) {

        studentRepository
                .findByIdAndDeletedIsFalse(id)
                .orElseThrow(() -> new StudentNotFoundException("Student Not Found with id: " + id));

        Student studentToUpdate;

        studentToUpdate = studentMapper.dtoToEntity(studentReq);
        studentToUpdate.setId(id);
        studentToUpdate.setDeleted(false);

        Student updatedStudent = studentRepository.save(studentToUpdate);

        return studentMapper.entityToDto(updatedStudent);
    }

    public Boolean deleteStudent(Long id) {
        Boolean isStudent = studentRepository
                            .existsById(id);
        if(!isStudent) throw new StudentNotFoundException("Student Not Found with id: " + id);
        studentRepository.deleteById(id);
        return isStudent;
    }

    public Boolean deleteStudentSoftly(Long id) {
        Student studentToSave = studentRepository
                .findByIdAndDeletedIsFalse(id)
                .orElseThrow(() -> new StudentNotFoundException("Student Not Found with id: " + id));

        studentToSave.setDeleted(true);
        studentRepository.save(studentToSave);

        return true;
    }

    public Boolean restoreStudent(Long id) {
        Student studentToSave = studentRepository
                .findByIdAndDeletedIsTrue(id)
                .orElseThrow(() -> new StudentNotFoundException("Student Not Found with id : " + id));
        studentToSave.setDeleted(false);
        studentRepository.save(studentToSave);

        return true;
    }

    public List<StudentResponseDTO> getAllDeletedStudents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Student> studentPage =  studentRepository
                .findByDeletedIsTrue(pageable);

        if (studentPage.isEmpty()) {
            throw new StudentNotFoundException("No student records found in the system.");
        }
        List<StudentResponseDTO> dtoList = new ArrayList<>();

        for(Student student : studentPage.getContent()) {
            StudentResponseDTO dto = studentMapper.entityToDto(student);
            dtoList.add(dto);
        }
        return dtoList;
    }
}
