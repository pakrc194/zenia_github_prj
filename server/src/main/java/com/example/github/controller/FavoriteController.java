package com.example.github.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.github.dto.response.FavoriteRequest;
import com.example.github.service.FavoriteService;

import jakarta.annotation.Resource;

@RestController
@RequestMapping("/favorite")
public class FavoriteController {
	
	@Resource
	FavoriteService favoriteService;
	
	@GetMapping
	List<FavoriteRequest> list() {
		return favoriteService.list();
	}
	
	@PostMapping
	int insert(@RequestBody FavoriteRequest req) {
		System.out.println(req);
		
		return favoriteService.insert(req);
	}
	
	@DeleteMapping("/{id}")
	int delete(@PathVariable Long id) {
		return favoriteService.delete(id);
	}
	
}
