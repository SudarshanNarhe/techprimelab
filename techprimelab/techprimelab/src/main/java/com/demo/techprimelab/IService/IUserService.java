package com.demo.techprimelab.IService;

import java.util.List;

import com.demo.techprimelab.Models.User;


public interface IUserService {
	
	List<User> getAllUser();
	User saveUser(User u);
	User upateUser(User u);
	void deleteUser(int id);
	User searchById(int id);
	User findByEmail(String email);
}
