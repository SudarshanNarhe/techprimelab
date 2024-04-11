package com.demo.techprimelab.Models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
@Entity
@Table (name = "projects")
public class Projects {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="project_id")
	private int project_id;
	
	@Column(name ="project_name",nullable = false)
	private String project_name;
	
	@ManyToOne
    @JoinColumn(name = "reason_id",nullable = false,referencedColumnName ="reason_id")
	private Reason reason_id;
	
	@ManyToOne
	@JoinColumn(name ="type_id", nullable = false,referencedColumnName ="type_id")
	private Types type_id;
	
	@ManyToOne
	@JoinColumn(name ="division_id", nullable = false,referencedColumnName ="division_id")
	private Division division_id;
	
	@ManyToOne
	@JoinColumn(name ="category_id",referencedColumnName = "category_id", nullable = false)
	private Category category_id;
	
	@ManyToOne
	@JoinColumn(name ="priority_id", nullable = false,referencedColumnName ="priority_id")
	private Priority priority_id;
	
	@ManyToOne	  
	@JoinColumn(name ="department_id", nullable = false,referencedColumnName ="department_id")
	private Department department_id;
	
	@ManyToOne	 
	@JoinColumn(name ="location_id", nullable = false,referencedColumnName ="location_id")
	private Location location_id;
	
	@ManyToOne
	@JoinColumn(name ="status_id", nullable = false,referencedColumnName ="status_id")
	private Status status_id;
	
	@Column(name ="start_date",nullable = false)
	private Date start_date;
	
	@Column(name ="end_date",nullable = false)
	private Date end_date;
	
	@ManyToOne
	@JoinColumn(name ="user_id", nullable = false,referencedColumnName ="user_id")
	private User user_id;
	
	
	public void setReason_id(int reason_id) {
        this.reason_id = new Reason();
        this.reason_id.setReason_id(reason_id);
    }
    
    public void setType_id(int type_id) {
        this.type_id = new Types();
        this.type_id.setType_id(type_id);
    }
    
    public void setDivision_id(int division_id) {
        this.division_id = new Division();
        this.division_id.setDivision_id(division_id);
    }
    
    public void setCategory_id(int category_id) {
        this.category_id = new Category();
        this.category_id.setCategory_id(category_id);
    }
    
    public void setPriority_id(int priority_id) {
        this.priority_id = new Priority();
        this.priority_id.setPriority_id(priority_id);
    }
    
    public void setDepartment_id(int department_id) {
        this.department_id = new Department();
        this.department_id.setDepartment_id(department_id);
    }
    
    public void setLocation_id(int location_id) {
        this.location_id = new Location();
        this.location_id.setLocation_id(location_id);
    }
    
    public void setStatus_id(int status_id) {
        this.status_id = new Status();
        this.status_id.setStatus_id(status_id);
    }
    
    public void setUser_id(int user_id) {
        this.user_id = new User();
        this.user_id.setUser_id(user_id);
    }
	
}
