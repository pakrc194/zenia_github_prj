package com.example.github.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.github.dto.response.SearchLogDto;
import com.example.github.mapper.SearchMapper;

@Service
public class SearchService {
	@Autowired
	SearchMapper searchMapper;
	
	public List<SearchLogDto> list(int limit) {
		return searchMapper.findByLimit(limit);
	}
	
	public int delete(Long id) {
		return searchMapper.delete(id);
	}
}
