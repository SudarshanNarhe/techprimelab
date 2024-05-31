package com.techprimelab.IService;

import java.util.List;

import com.techprimelab.Models.Project;


public interface IProjectService {

	List<Project> getAllProject();
	Project saveProject(Project u);
	Project updateProject(Project u) throws Exception;
	void deleteProject(Long projectId) throws Exception;
	Project findProjectById(Long projectId) throws Exception;
}
