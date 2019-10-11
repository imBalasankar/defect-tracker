package com.balsp.DefectTracker.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="projects",schema = "dt")
public class Project{
	
	@Id
	private String projectId;
	private String projectName;
	private String projectDescription;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "project")
	@JsonIgnore
	private List<Defect> defect;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "project")
	@JsonIgnore
	private List<User> user;
	
	public Project() {
		
	}

	public Project(String projectId, String projectName, String projectDescription) {
		super();
		this.projectId = projectId;
		this.projectName = projectName;
		this.projectDescription = projectDescription;
	}

	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectDescription() {
		return projectDescription;
	}

	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}

	public List<Defect> getDefect() {
		return defect;
	}

	public void setDefect(List<Defect> defect) {
		this.defect = defect;
	}

	public List<User> getUser() {
		return user;
	}

	public void setUser(List<User> user) {
		this.user = user;
	}
	
}
