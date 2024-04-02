package com.demo.techprimelab.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.demo.techprimelab.Models.User;

public interface UserRepo extends JpaRepository<User, Integer>{
	
	@Query(value = "select * from users where email =:email", nativeQuery = true)
	public User findByEmail(@Param("email") String email);
	
}
