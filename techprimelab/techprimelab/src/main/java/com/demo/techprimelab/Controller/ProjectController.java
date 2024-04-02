package com.demo.techprimelab.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.demo.techprimelab.Models.Category;
import com.demo.techprimelab.Models.Department;
import com.demo.techprimelab.Models.Division;
import com.demo.techprimelab.Models.Location;
import com.demo.techprimelab.Models.Priority;
import com.demo.techprimelab.Models.Projects;
import com.demo.techprimelab.Models.Reason;
import com.demo.techprimelab.Models.Status;
import com.demo.techprimelab.Models.Types;
import com.demo.techprimelab.Services.ProjectService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/projects")
public class ProjectController {

	@Autowired
	private ProjectService projectservice;

	@PostMapping("/saveProject")
	public Projects saveProject(@RequestBody Projects p) {
		Projects project = null;
		System.out.println("Inside save project");

		try {
			project = projectservice.saveProject(p);
			System.out.println("Project Saved Successfully");
			System.out.println(project);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return project;
	}

	@GetMapping("/getAllProjects")
	public List<Projects> getAllProjects() {
		List<Projects> projectlist = projectservice.getAllProjects();
		return projectlist;
	}

	@PutMapping("/updateProject")
	public Projects upadateProject(@RequestBody Projects u) {
		Projects project = null;
		try {
			project = projectservice.updateProject(u);
			System.out.println("project Saved Successfully");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return project;
	}

	@DeleteMapping("/deleteProject/{id}")
	public void deleteProject(@PathVariable int id) {

		try {
			projectservice.deleteProject(id);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	@GetMapping("/searchById/{id}")
	public Projects searchById(@PathVariable int id) {
		Projects project = null;
		try {
			project = projectservice.searchById(id);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return project;
	}

	@GetMapping("/getAllCategories")
	public List<Category> getAllCategories() {
		List<Category> catlist = projectservice.getAllCategories();
		return catlist;
	}

	@GetMapping("/getAllDepartments")
	public List<Department> getAllDepartments() {
		List<Department> deplist = projectservice.getAllDepartments();
		return deplist;
	}

	@GetMapping("/getAllDivisions")
	public List<Division> getAllDivision() {
		List<Division> divisionlist = projectservice.getAllDivision();
		return divisionlist;
	}

	@GetMapping("/getAllLocations")
	public List<Location> getAllLocations() {
		List<Location> locationlist = projectservice.getAllLocation();
		return locationlist;
	}

	@GetMapping("/getAllPriority")
	public List<Priority> getAllPriority() {
		List<Priority> prioritylist = projectservice.getAllPriority();
		return prioritylist;
	}

	@GetMapping("/getAllReasons")
	public List<Reason> getAllReasons() {
		List<Reason> reasonlist = projectservice.getAllReason();
		return reasonlist;
	}

	@GetMapping("/getAllStatus")
	public List<Status> getAllStatus() {
		List<Status> stauslist = projectservice.getAllStatus();
		return stauslist;
	}

	@GetMapping("/getAllTypes")
	public List<Types> getAllTypes() {
		List<Types> typelist = projectservice.getAllTypes();
		return typelist;
	}

	@PutMapping("/updateStatus/{project_id}/{status_id}")
	public ResponseEntity<Projects> updateProjectStatus(@PathVariable int project_id, @PathVariable int status_id) {
		System.out.println("in Controller : " + status_id);
		Projects updatedProject = projectservice.updateProjectStatus(project_id, status_id);
		System.out.println("in updatestatus");
		return ResponseEntity.ok(updatedProject);
	}

	@GetMapping("/getTotalProjectCount")
	public int getTotalProjectCount() {
		return projectservice.getTotalProjectCount();
	}

	@GetMapping("/closedProjectsCount")
	public int getClosedProjectsCount() {
		return projectservice.getClosedProjectsCount();
	}

	@GetMapping("/cancelledProjectsCount")
	public int getCancelledProjectsCount() {
		return projectservice.getCancelledProjectsCount();
	}

	@GetMapping("/runningProjectsCount")
	public int getRunningProjectsCount() {
		return projectservice.getRunningProjectsCount();
	}
	
	@GetMapping("/getProjectsOfUser/{email}")
	public Projects getProjectsOfUser(@PathVariable String email) {
		return projectservice.getProjectsOfUser(email);
	}

}
