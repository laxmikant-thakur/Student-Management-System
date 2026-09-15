package com.example.crudSpringBootDemo.controller;

import com.example.crudSpringBootDemo.dto.StudentRequestDTO;
import com.example.crudSpringBootDemo.dto.StudentResponseDTO;
import com.example.crudSpringBootDemo.entity.Student;
import com.example.crudSpringBootDemo.exception.StudentNotFoundException;
import com.example.crudSpringBootDemo.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    //create student
    @PostMapping("/create")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<StudentResponseDTO> createStudent(@Valid @RequestBody StudentRequestDTO studentReq) {
        StudentResponseDTO createdStudent = studentService.createStudent(studentReq);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdStudent);
    }

    //read student
    @GetMapping("/get")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<StudentResponseDTO> getStudent(@RequestParam Long id) {
        StudentResponseDTO studentResp = studentService.getStudent(id);
        return ResponseEntity.ok(studentResp);
    }

    @GetMapping("/getAll")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<StudentResponseDTO>> getAllStudents(
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "3") int size,
                                    @RequestParam(defaultValue = "id") String sortBy,
                                    @RequestParam(defaultValue = "asc") String direction) {
        List<StudentResponseDTO> studentList = studentService.getAllStudents(page, size, sortBy, direction);

        return ResponseEntity.ok(studentList);
    }

    //update student
    @PutMapping("/update")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<StudentResponseDTO> updateStudent(@RequestParam Long id,
                                                 @Valid @RequestBody StudentRequestDTO studentReq) {
        StudentResponseDTO studentResp = studentService.updateStudent(id, studentReq);

        return ResponseEntity.ok(studentResp);
    }
    //delete student
    @DeleteMapping("/delete")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<String> deleteStudent(@RequestParam Long id) {
        Boolean isDeleted = studentService.deleteStudent(id);

        return ResponseEntity.ok("Records Deleted");
    }

    //soft Delete
    @PatchMapping("/delete-soft")
    public ResponseEntity<String> softDeleteStudent(@RequestParam Long id) {
        Boolean isDeleted = studentService.deleteStudentSoftly(id);

        return ResponseEntity.ok("Record Deleted");
    }

    @PatchMapping("/restore")
    public ResponseEntity<String> restoreStudent(@RequestParam Long id) {
        Boolean isDeleted = studentService.restoreStudent(id);

        return ResponseEntity.ok("Record Restored");
    }

    @GetMapping("/deleted")
    public ResponseEntity<List<StudentResponseDTO>> deletedStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        List<StudentResponseDTO> studentList = studentService.getAllDeletedStudents(page, size);

        return ResponseEntity.ok(studentList);
    }
}
