package com.demo.techprimelab.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.techprimelab.IService.IProjectService;
import com.demo.techprimelab.Models.Category;
import com.demo.techprimelab.Models.Department;
import com.demo.techprimelab.Models.Division;
import com.demo.techprimelab.Models.Location;
import com.demo.techprimelab.Models.Priority;
import com.demo.techprimelab.Models.Projects;
import com.demo.techprimelab.Models.Reason;
import com.demo.techprimelab.Models.Status;
import com.demo.techprimelab.Models.Types;
import com.demo.techprimelab.Repositories.CategoryRepo;
import com.demo.techprimelab.Repositories.DepartmentRepo;
import com.demo.techprimelab.Repositories.DivisionRepo;
import com.demo.techprimelab.Repositories.LocationRepo;
import com.demo.techprimelab.Repositories.PriorityRepo;
import com.demo.techprimelab.Repositories.ProjectsRepo;
import com.demo.techprimelab.Repositories.ReasonRepo;
import com.demo.techprimelab.Repositories.StatusRepo;
import com.demo.techprimelab.Repositories.TypesRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProjectService implements IProjectService{
	
	@Autowired
	private CategoryRepo catrepo;
	
	@Autowired
	private DepartmentRepo deptrepo;
	
	@Autowired
	private DivisionRepo divisonrepo;
	
	@Autowired
	private LocationRepo locationrepo;
	
	@Autowired
	private PriorityRepo prirepo;
	
	@Autowired
	private ReasonRepo reasonrepo;
	
	@Autowired
	private StatusRepo statusrepo;
	
	@Autowired
	private TypesRepo typesrepo;
	
	@Autowired
	private ProjectsRepo projectsrepo;
	
	@Override
	public List<Projects> getAllProjects() {
		List<Projects> projectlist = projectsrepo.findAll();
		return projectlist;
	}

	@Override
	public Projects saveProject(Projects p) {
		Projects project = projectsrepo.save(p);
		return project;
	}

	@Override
	public Projects updateProject(Projects p) {
		Projects project = projectsrepo.save(p);
		return project;
	}

	@Override
	public void deleteProject(int id) {
		projectsrepo.deleteById(id);
		
	}

	@Override
	public Projects searchById(int id) {
		Projects project = projectsrepo.findById(id).get();
		return project;
	}
	
	
	
	@Override
	public List<Category> getAllCategories() {
		List<Category> category = catrepo.findAll();
		return category;
	}

	@Override
	public List<Department> getAllDepartments() {
		List<Department> department = deptrepo.findAll();
		return department;
	}

	@Override
	public List<Division> getAllDivision() {
		List<Division> division = divisonrepo.findAll();
		return division;
	}

	@Override
	public List<Location> getAllLocation() {
		List<Location> location = locationrepo.findAll();
		return location;
	}

	@Override
	public List<Priority> getAllPriority() {
		List<Priority> priority = prirepo.findAll();
		return priority;
	}

	@Override
	public List<Reason> getAllReason() {
		List<Reason> reason = reasonrepo.findAll();
		return reason;
	}

	@Override
	public List<Status> getAllStatus() {
		List<Status> status = statusrepo.findAll();
		return status;
	}

	@Override
	public List<Types> getAllTypes() {
		List<Types> types = typesrepo.findAll();
		return types;
	}

	@Override
	public List<Projects> getProjectDetails() {
		 
		return null;
	}

	@Override
	public Projects updateProjectStatus(int project_id, int status_id) {
		System.out.println("Project ID : "+project_id);
		Projects project = projectsrepo.findById(project_id).orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + project_id));
        
        Status status1=  statusrepo.findById(status_id).orElseThrow(() -> new EntityNotFoundException("Status not found with id: " + status_id));
        System.out.println("Status ID : "+status_id);
        
        int Sid=status1.getStatus_id();
        
        project.setStatus_id(Sid);
   
        return projectsrepo.save(project);
	}

	 @Override
	  public int getTotalProjectCount() {
	      return (int) projectsrepo.count();
	  }

	   public int countProjectsByStatus(int status_id) {
	          return projectsrepo.countProjectsByStatus(status_id);
	      }
	  @Override
	  public int getClosedProjectsCount() {
	    return countProjectsByStatus(2);
	  }

	  @Override
	  public int getCancelledProjectsCount() {
	    return countProjectsByStatus(3);
	  }

	  @Override
	  public int getRunningProjectsCount() {
	    return countProjectsByStatus(1);
	  }

	@Override
	public Projects getProjectsOfUser(String email) {
		Projects project=projectsrepo.getProjectsOfUser(email);
		return project;
	}


}
