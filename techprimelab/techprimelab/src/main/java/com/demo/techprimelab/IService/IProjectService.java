package com.demo.techprimelab.IService;

import java.util.List;

import com.demo.techprimelab.Models.Category;
import com.demo.techprimelab.Models.Department;
import com.demo.techprimelab.Models.Division;
import com.demo.techprimelab.Models.Location;
import com.demo.techprimelab.Models.Priority;
import com.demo.techprimelab.Models.Projects;
import com.demo.techprimelab.Models.Reason;
import com.demo.techprimelab.Models.Status;
import com.demo.techprimelab.Models.Types;

public interface IProjectService {
	
	List<Projects> getAllProjects();
	Projects saveProject(Projects p);
	Projects updateProject(Projects p);
	void deleteProject(int id);
	Projects searchById(int id);
	
	List<Category> getAllCategories();
	List<Department> getAllDepartments();
	List<Division> getAllDivision();
	List<Location> getAllLocation();
	List<Priority> getAllPriority();
	List<Reason> getAllReason();
	List<Status> getAllStatus();
	List<Types> getAllTypes();
	
	List<Projects> getProjectDetails();
	
	Projects updateProjectStatus(int project_id, int status_id);
	
	int getTotalProjectCount();
	
	int countProjectsByStatus(int status_id);
	 
	int getClosedProjectsCount();
	 
    int getCancelledProjectsCount();
	 
    int getRunningProjectsCount(); 
    
    Projects getProjectsOfUser(String email);
	
}
