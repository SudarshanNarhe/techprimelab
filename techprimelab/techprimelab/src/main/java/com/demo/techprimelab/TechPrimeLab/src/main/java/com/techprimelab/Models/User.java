	package com.techprimelab.Models;
	
	import org.springframework.stereotype.Component;
	
	import jakarta.persistence.Column;
	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.Table;
	import lombok.AllArgsConstructor;
	import lombok.Getter;
	import lombok.NoArgsConstructor;
	import lombok.Setter;
	
	@Setter
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	@Component
	@Entity
	@Table(name = "users")
	public class User {
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name ="user_id")
		private long userId;
		@Column(name = "user_name",nullable = false)
		private String username;
		@Column(name = "contact",nullable = false,unique = true)
		private String  contact;
		@Column(name = "email",nullable = false,unique = true)
		private String email;
		@Column(name = "pass_word",nullable = false)
		private String password;
		@Column(name="address",nullable = false)
		private String address;
		@Column(name = "user_role",columnDefinition = "VARCHAR(25) default 'user'")
		private String userRole;
		@Override
		public String toString() {
			return "User [userId=" + userId + ", username=" + username + ", contact=" + contact + ", email=" + email
					+ ", password=" + password + ", address=" + address + ", userRole=" + userRole + "]";
		}
		
		
		
	}
