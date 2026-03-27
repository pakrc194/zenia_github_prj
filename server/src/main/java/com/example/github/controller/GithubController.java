package com.example.github.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.github.dto.response.GithubRepoResponse;
import com.example.github.service.GithubService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/github")
@RequiredArgsConstructor
public class GithubController {

    private final GithubService githubService;

    @GetMapping("/repo")
    public ResponseEntity<GithubRepoResponse> search(@RequestParam String q) {
        return ResponseEntity.ok(githubService.pinnedFilter(githubService.searchRepositories(q)));
    }
    
    @GetMapping("/users")
    public ResponseEntity<GithubRepoResponse> users(@RequestParam String q) {
        return ResponseEntity.ok(githubService.searchUsers(q));
    }
}