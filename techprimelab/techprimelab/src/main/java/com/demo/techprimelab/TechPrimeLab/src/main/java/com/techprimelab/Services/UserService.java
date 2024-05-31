package com.techprimelab.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.techprimelab.IService.IUserService;
import com.techprimelab.Models.User;
import com.techprimelab.Repositories.UserRepo;

@Service
@Transactional
public class UserService implements IUserService{

	@Autowired
	private UserRepo userRepo;
	
	@Override
	public List<User> getAllUser() {
		List<User> userList = userRepo.findAll();
		return userList;
	}

	@Override
	public User saveUser(User u){
		u.setUserRole("user");
		User res = userRepo.save(u);
		return res;
	}

	@Override
	public User updateUser(User u) throws Exception {
		User res = userRepo.save(u);
		return res;
	}

	@Override
	public void deleteUser(Long userId) throws Exception {
		findUserById(userId);
		userRepo.deleteById(userId);
		
	}

	@Override
	public User findUserById(Long userId) throws Exception {
		Optional<User> opt = userRepo.findById(userId);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new Exception("User not found "+userId);
	}


}
