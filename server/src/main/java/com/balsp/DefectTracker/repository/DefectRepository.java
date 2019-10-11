package com.balsp.DefectTracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.balsp.DefectTracker.model.Defect;

public interface DefectRepository extends JpaRepository<Defect, String> {
	
	public List<Defect> findByProjectProjectId(String id);
	
	public List<Defect> findByUserUserId(String id);
	
	public List<Defect> findByStatus(String status);
	
	public List<Defect> findBySeverityChoices(String severityChoices);
	
	public List<Defect> findByPriorityChoices(String priorityChoices);
	
	public Defect findByDefectId(String defectId);

}
