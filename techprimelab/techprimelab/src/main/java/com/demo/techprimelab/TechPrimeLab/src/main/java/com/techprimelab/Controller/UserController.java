package com.techprimelab.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.techprimelab.IService.IUserService;
import com.techprimelab.Models.User;
import com.techprimelab.Repositories.UserRepo;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private IUserService userService;
	
	@Autowired
	private UserRepo userRepo;
	
	@GetMapping("/getAllUser")
	public List<User> getAllUser() {
		
		return userService.getAllUser();
	}
	
	@PostMapping("/saveUser")
	public User saveUser(@RequestBody User u){
		User res = null;
		try {
			res = userService.saveUser(u);
			System.out.println("User saved..."+u);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return res;	
	}
	
	@PutMapping("/updateUser")
	public User updateUser(@RequestBody User u) {
		User res = null;
		try {
			res = userService.updateUser(u);
			System.out.println("User updated..."+u);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return res;
	}
	

	@DeleteMapping("/deleteUser/{userId}")
	public String deleteUser(@PathVariable Long userId) {
		try {
			userService.deleteUser(userId);
			System.out.println("User Deleted: "+userId);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return "Delete Successfully";
	}
	
	@GetMapping("/findUserById/{userId}")
	public ResponseEntity<User> findUserById(@PathVariable Long userId) throws Exception {
		 User user = userService.findUserById(userId);
	        return ResponseEntity.ok(user);
	}
	
	
	@GetMapping("/findByGmail/{email}")
	public ResponseEntity<User> findByEmail(@PathVariable String email) throws Exception {
		 User user = userRepo.findByEmail(email);
	        return ResponseEntity.ok(user);
	}
	
	@GetMapping("/findByContact/{contact}")
	public ResponseEntity<User> findByContact(@PathVariable String contact) throws Exception {
		 User user = userRepo.findByContact(contact);
	        return ResponseEntity.ok(user);
	}
	
	 // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
    	
        try {
            // Find user by email
            User existingUser = userRepo.findByEmail(user.getEmail());
            if (existingUser == null) {
            	System.out.println("Error while login..");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
            // Check if passwords match
            if (!existingUser.getPassword().equals(user.getPassword())) {
            	System.out.println("Error while login..");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
            System.out.println(existingUser);
            System.out.println("Login api working..");
            return ResponseEntity.ok(existingUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
	
}
