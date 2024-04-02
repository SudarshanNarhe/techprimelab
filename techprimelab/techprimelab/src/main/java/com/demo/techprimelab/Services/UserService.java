package com.demo.techprimelab.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.techprimelab.IService.IUserService;
import com.demo.techprimelab.Models.User;
import com.demo.techprimelab.Repositories.UserRepo;

@Service
public class UserService implements IUserService{

	@Autowired
	private UserRepo userrepo;
	
	@Override
	public List<User> getAllUser() {
		List<User> userlist= userrepo.findAll();
		return userlist;
	}

	@Override
	public User saveUser(User u) {
		u.setUser_role("user");
		User user = userrepo.save(u);
		return user;
	}

	@Override
	public User upateUser(User u) {
		User user = userrepo.save(u);
		return user;
	}

	@Override
	public void deleteUser(int id) {
		userrepo.deleteById(id);
		
	}
	
	@Override
	public User searchById(int id) {
		User user  =userrepo.findById(id).get();
		return user;
	}
	
	@Override
	public User findByEmail(String email) {
		User user= userrepo.findByEmail(email);
		return user;
	}

}
