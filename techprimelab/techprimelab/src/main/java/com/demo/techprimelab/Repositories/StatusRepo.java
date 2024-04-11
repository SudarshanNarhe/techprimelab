package com.demo.techprimelab.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.techprimelab.Models.Status;

public interface StatusRepo extends JpaRepository<Status, Integer>{

}
