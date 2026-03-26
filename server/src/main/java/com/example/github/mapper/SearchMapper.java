package com.example.github.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.github.dto.response.SearchLogDto;

@Mapper
public interface SearchMapper {
	List<SearchLogDto> findByLimit(int limit);
	
	int upsert(String name);
	
	int delete(Long id);
}
