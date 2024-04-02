package com.demo.techprimelab.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.techprimelab.Models.Department;

public interface DepartmentRepo extends JpaRepository<Department, Integer>{

}
