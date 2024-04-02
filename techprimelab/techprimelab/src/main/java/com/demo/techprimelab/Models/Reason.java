package com.demo.techprimelab.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@ToString
@Setter
@Table(name="reason")
public class Reason {
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="reason_id")
	private int reason_id;
	@Column(name="reason" , nullable = false , columnDefinition = "VARCHAR(30)")
	private String reason;
	
}
