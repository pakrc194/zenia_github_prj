package com.example.github.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.github.dto.response.SearchLogDto;
import com.example.github.dto.response.SearchRequest;

@Mapper
public interface SearchMapper {
	List<SearchLogDto> findByLimit(int limit);
	
	int upsert(SearchRequest req);
	
	int delete(Long id);
	
	int togglePinned(Long id);
}
