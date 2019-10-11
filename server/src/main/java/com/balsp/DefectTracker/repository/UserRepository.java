package com.balsp.DefectTracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.balsp.DefectTracker.model.User;

public interface UserRepository extends JpaRepository<User, String> {
	public User findByUserId(String userId);
	
	public List<User> findByProjectProjectId(String id);
}
