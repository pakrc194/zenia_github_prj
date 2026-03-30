package com.example.github.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.github.dto.response.GithubRepoResponse;
import com.example.github.dto.response.SearchRequest;
import com.example.github.service.GithubService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/github")
@RequiredArgsConstructor
public class GithubController {

    private final GithubService githubService;

    @PostMapping("/repo")
    public ResponseEntity<GithubRepoResponse> search(@RequestParam String q, @RequestBody SearchRequest req) {
    	System.out.println("req : "+req);
    	req = req.withName(q);
    	System.out.println("withSearch : "+req);
        return ResponseEntity.ok(githubService.pinnedFilter(githubService.searchRepositories(req)));
    }
    
    @GetMapping("/users")
    public ResponseEntity<GithubRepoResponse> users(@RequestParam String q) {
        return ResponseEntity.ok(githubService.searchUsers(q));
    }
}