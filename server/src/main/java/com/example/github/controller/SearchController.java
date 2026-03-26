package com.example.github.controller;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.github.dto.response.SearchLogDto;
import com.example.github.service.SearchService;

@RestController
@RequestMapping("/search")
public class SearchController {
	@Autowired
	SearchService searchService;
	
	@GetMapping("/list")
	List<SearchLogDto> list(@RequestParam(required = false, defaultValue = "0") int limit) {
		return searchService.list(limit);
	}
	
	@DeleteMapping("/{id}")
	int delete(@PathVariable Long id) {
		return searchService.delete(id);
	}
}
