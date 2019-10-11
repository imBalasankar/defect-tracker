package com.balsp.DefectTracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.balsp.DefectTracker.model.Defect;
import com.balsp.DefectTracker.model.Project;
import com.balsp.DefectTracker.model.User;
import com.balsp.DefectTracker.repository.DefectRepository;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/api/v1")
public class DefectController {

	@Autowired
	DefectRepository defectRepository;

	// Add Defect
	@PostMapping(value = "/defect/{pid}")
	public void addDefect(@RequestBody Defect defect, @PathVariable String pid) {
		defect.setProject(new Project(pid, "", ""));
		defectRepository.save(defect);
	}

	// Get All Defects
	@GetMapping(value = "/defect")
	public List<Defect> getAllDefects() {
		return defectRepository.findAll();
	}

	// Get Defect By Id
	@GetMapping(value = "/defect/{id}")
	public Defect getDefectById(@PathVariable String id) {
		return defectRepository.findByDefectId(id);
	}

	// Get Defects By Project Id
	@GetMapping(value = "/defect/p/{pid}")
	public List<Defect> getDefectsByProjectId(@PathVariable String pid) {
		return defectRepository.findByProjectProjectId(pid);
	}

	// Get Defects By User Id
	@GetMapping(value = "/defect/u/{uid}")
	public List<Defect> getDefectsByUserId(@PathVariable String uid) {
		return defectRepository.findByUserUserId(uid);
	}

	// Modify Defect
	@PutMapping(value = "/defect/update/{pid}")
	public void updateDefect(@RequestBody Defect defect, @PathVariable String pid) {
		defect.setProject(new Project(pid, "", ""));
		defectRepository.save(defect);
	}

	// Assign User
	@PutMapping(value = "/defect/{id}/assign-user/{uid}")
	public void assignUser(@PathVariable String id, @PathVariable String uid) {
		Defect defect = getDefectById(id);
		defect.setUser(new User(uid, "", ""));
		defectRepository.save(defect);
	}

	// Change User
	@PutMapping(value = "/defect/{id}/change-user/{uid}")
	public void changeUser(@PathVariable String id, @PathVariable String uid) {
		Defect defect = getDefectById(id);
		defect.setUser(new User(uid, "", ""));
		defectRepository.save(defect);
	}

	// Unassign User
	@PutMapping(value = "/defect/{id}/unassign-user")
	public void unassignUser(@PathVariable String id) {
		Defect defect = getDefectById(id);
		defect.setUser(null);
		defectRepository.save(defect);
	}

	// Get Defects By Status
	@GetMapping(value = "/defect/status/{status}")
	public List<Defect> getDefectsByStatus(@PathVariable String status) {
		return defectRepository.findByStatus(status);
	}

	// Change the Status of the Defect
	@PutMapping(value = "/defect/{id}/change-status/{status}")
	public void changeStatus(@PathVariable String id, @PathVariable String status) {
		Defect defect = getDefectById(id);
		defect.setStatus(status);
		defectRepository.save(defect);
	}

	// Get Defects By Severity
	@GetMapping(value = "/defect/severity/{sev}")
	public List<Defect> getDefectsBySeverity(@PathVariable String sev) {
		return defectRepository.findBySeverityChoices(sev);
	}

	// Get Defects By Priority
	@GetMapping(value = "/defect/priority/{pri}")
	public List<Defect> getDefectsByPriority(@PathVariable String pri) {
		return defectRepository.findByPriorityChoices(pri);
	}

	// Remove a Defect
	@DeleteMapping(value = "/defect/{id}")
	public void deleteDefect(@PathVariable String id) {
		defectRepository.deleteById(id);
	}

}
