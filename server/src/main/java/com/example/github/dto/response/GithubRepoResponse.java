package com.example.github.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

//GithubRepoResponse.java
public record GithubRepoResponse(
 @JsonProperty("total_count") int totalCount,
 List<GithubRepoItem> items
) {}

