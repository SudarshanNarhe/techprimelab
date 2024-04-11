package com.demo.techprimelab.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.techprimelab.Models.Location;


public interface LocationRepo extends JpaRepository<Location, Integer>{

}
