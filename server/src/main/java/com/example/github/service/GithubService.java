package com.example.github.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import com.example.github.dto.response.GithubRepoItem;
import com.example.github.dto.response.GithubRepoResponse;
import com.example.github.dto.response.SearchRequest;
import com.example.github.mapper.FavoriteMapper;
import com.example.github.mapper.SearchMapper;

@Service
public class GithubService {

    private final RestClient restClient;
    
    @Autowired
    SearchMapper searchMapper;
    @Autowired
    FavoriteMapper favoriteMapper;

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
    @Cacheable(value = "github_search", key = "#req.name", cacheManager = "redisCacheManager")
    public GithubRepoResponse searchRepositories(SearchRequest req) {
    	searchMapper.upsert(req);
    	
    	GithubRepoResponse res = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/repositories")
                        .queryParam("q", req.name())
                        .build())
                .retrieve()
                .body(GithubRepoResponse.class);

        return res;
    }
    
    
    public GithubRepoResponse pinnedFilter(GithubRepoResponse res) {
    	List<GithubRepoItem> items = res.items().stream().map(item->{
    		int findCount = favoriteMapper.countByFullName(item.fullName());
    		
    		System.out.println("find "+item.fullName()+"("+findCount+")");
    		
    		if(findCount > 0) {
    			return item.withPinned(true);
    		} else {
    			return item.withPinned(false);
    		}
    	}).toList();
    	//System.out.println(items);
    	
    	res = res.withItems(items);
    	
    	System.out.println(res);
    	return res;
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