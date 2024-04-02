package com.demo.techprimelab.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.techprimelab.Models.Category;


public interface CategoryRepo extends JpaRepository<Category, Integer>{

}
