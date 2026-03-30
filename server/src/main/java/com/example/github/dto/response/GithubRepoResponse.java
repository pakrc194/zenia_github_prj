package com.example.github.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GithubRepoResponse(
	@JsonProperty("total_count") int totalCount,
 	List<GithubRepoItem> items
) {
	public GithubRepoResponse withItems(List<GithubRepoItem> newItems) {
        return new GithubRepoResponse(this.totalCount, newItems);
    }
}

