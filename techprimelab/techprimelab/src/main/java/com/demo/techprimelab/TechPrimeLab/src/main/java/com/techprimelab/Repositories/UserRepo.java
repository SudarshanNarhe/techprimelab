package com.techprimelab.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.techprimelab.Models.User;

public interface UserRepo extends JpaRepository<User, Long>{
	
	@Query(value = "SELECT * FROM users WHERE email =:email", nativeQuery = true)
	public User findByEmail(@Param("email") String email);
	
	@Query(value = "SELECT * FROM users WHERE contact =:contact", nativeQuery = true)
	public User findByContact(@Param("contact") String contact);
	
}