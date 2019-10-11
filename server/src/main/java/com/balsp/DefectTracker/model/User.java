package com.balsp.DefectTracker.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="users",schema = "dt")
public class User {
	
	@Id
	private String userId;
	private String userName;
	private String userType;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	@JsonIgnore
	private List<Defect> defect;
	
	@ManyToOne()
	@JoinColumn(name="pid")
	private Project project;
	
	public User() {
		
	}

	public User(String userId, String userName, String userType) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userType = userType;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public List<Defect> getDefect() {
		return defect;
	}

	public void setDefect(List<Defect> defect) {
		this.defect = defect;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}
	
}
