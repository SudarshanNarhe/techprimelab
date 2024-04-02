package com.demo.techprimelab.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="users",uniqueConstraints = {@UniqueConstraint(columnNames = {"email", "contact"})})
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id")
	private int user_id;
	@Column(name="user_name", nullable = false)
	private String name;
	@Column(name="address", nullable = false)
	private String address;
	@Column(name="contact", nullable = false)
	private String contact;
	@Column(name="email", nullable = false)
	private String email;
	@Column(name="user_password", nullable = false)
	private String password;
	@Column(name="user_role", columnDefinition = "VARCHAR(50) default 'user'")
	private String user_role;
	
	@Override
	public String toString() {
		return "User [id=" + user_id + ", name=" + name + ", address=" + address + ", contact=" + contact + ", email="
				+ email + ", password=" + password + ", user_role=" + user_role + "]";
	}
	
	
	
}
