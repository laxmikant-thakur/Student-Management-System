package com.example.crudSpringBootDemo.repository;

import com.example.crudSpringBootDemo.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student>  findByIdAndDeletedIsFalse(Long id);
    Optional<Student> findByIdAndDeletedIsTrue(Long id);
    Page<Student> findByDeletedIsFalse(Pageable pageable);
    Page<Student> findByDeletedIsTrue(Pageable pageable);

    boolean existsByEmail(String email);
}
