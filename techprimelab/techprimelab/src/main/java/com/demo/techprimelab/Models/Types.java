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
@Setter
@Getter
@ToString
@Table(name ="type_s")
public class Types {
	
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	@Column(name ="type_id")
	private int type_id;
	@Column(name="type_name", nullable = false, columnDefinition = "VARCHAR(40)")
	private String type_name;
	
}
