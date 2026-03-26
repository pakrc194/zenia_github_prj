package com.example.github.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import com.example.github.dto.response.GithubRepoResponse;
import com.example.github.dto.response.SearchLogDto;
import com.example.github.mapper.SearchMapper;

@Service
public class GithubService {

    private final RestClient restClient;
    
    @Autowired
    SearchMapper searchMapper;

    public GithubService(@Value("${github.api.url}") String baseUrl,
                         @Value("${github.api.token}") String token) {
        this.restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("Authorization", "Bearer " + token)
                .defaultHeader("Accept", "application/vnd.github+json")
                .defaultHeader("User-Agent", "Spring-Boot-App") // GitHub API는 User-Agent 필수
                .build();
    }
    
    @Transactional
    public GithubRepoResponse searchRepositories(String query) {
    	
    	searchMapper.upsert(query);
    	
        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/repositories")
                        .queryParam("q", query)
                        .build())
                .retrieve()
                .body(GithubRepoResponse.class);
    }
    
    public GithubRepoResponse searchUsers(String query) {
        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/users")
                        .queryParam("q", query)
                        .build())
                .retrieve()
                .body(GithubRepoResponse.class);
    }
}