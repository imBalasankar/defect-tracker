package com.balsp.DefectTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.balsp.DefectTracker.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String>{
	public Project findByProjectId(String projectId);
}
