package com.balsp.DefectTracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.balsp.DefectTracker.model.Project;
import com.balsp.DefectTracker.model.User;
import com.balsp.DefectTracker.repository.DefectRepository;
import com.balsp.DefectTracker.repository.UserRepository;

@RestController
@RequestMapping("/api/v1")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	DefectRepository defectRepository;
	
	
	//Add User
	@PostMapping(value="/user")
	public void addUser(@RequestBody User user){
		userRepository.save(user);
	}
	
	
	//Get All Users
	@GetMapping(value="/user")
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	
	//Get User By User Id
	@GetMapping(value="/user/{id}")
	public User getUserByUserId(@PathVariable String id){
		return userRepository.findByUserId(id);
	}
	
	
	//Add Project to User
	@PostMapping(value="/user/{uid}/add-project/{pid}")
	public void addProject(@PathVariable String uid, @PathVariable String pid) {
		User user = getUserByUserId(uid);
		user.setProject(new Project(pid,"",""));
		userRepository.save(user);
	}
	
	//Remove Project From User
	@PostMapping(value="/user/{uid}/remove-project")
	public void removeProject(@PathVariable String uid) {
		User user = getUserByUserId(uid);
		user.setProject(null);
		userRepository.save(user);
	}
	
	
	//
	@GetMapping(value="/user/p/{pid}")
	public List<User> getUsersByProjectId(@PathVariable String pid) {
		return userRepository.findByProjectProjectId(pid);
	}

}
