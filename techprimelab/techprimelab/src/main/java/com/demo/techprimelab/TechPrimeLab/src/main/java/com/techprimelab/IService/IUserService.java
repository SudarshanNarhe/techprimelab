package com.techprimelab.IService;

import java.util.List;

import com.techprimelab.Models.User;

public interface IUserService {
	
	List<User> getAllUser();
	User saveUser(User u);
	User updateUser(User u) throws Exception;
	void deleteUser(Long userId) throws Exception;
	User findUserById(Long userId) throws Exception;
}
