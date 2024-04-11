package com.demo.techprimelab.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.demo.techprimelab.Models.Projects;

@Repository
public interface ProjectsRepo extends JpaRepository<Projects, Integer>{
		
	  @Query("SELECT COUNT(p) FROM Projects p WHERE p.status_id.status_id = :status_id")
	   int countProjectsByStatus(int status_id);
	  
	  @Query("SELECT p FROM Projects p WHERE p.user_id.email = :email")
	  Projects getProjectsOfUser(String email);
	
}
