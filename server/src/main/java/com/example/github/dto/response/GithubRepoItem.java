package com.example.github.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

//GithubRepoItem.java
public record GithubRepoItem(
	String name,
	@JsonProperty("full_name") String fullName,
	@JsonProperty("html_url") String htmlUrl,
	String description,
	@JsonProperty("stargazers_count") int stars
) {}
