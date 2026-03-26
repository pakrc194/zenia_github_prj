package com.example.github.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.github.dto.response.FavoriteRequest;
import com.example.github.mapper.FavoriteMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoriteService {
	
	public final FavoriteMapper favoriteMapper;
	
	public List<FavoriteRequest> list() {
		return favoriteMapper.list();
	}
	
	public int insert(FavoriteRequest req) {
		return favoriteMapper.insert(req);
		
	}
	
	public int delete(Long id) {
		return favoriteMapper.delete(id);
	}
	
}
