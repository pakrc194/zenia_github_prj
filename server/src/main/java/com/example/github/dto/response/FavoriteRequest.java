package com.example.github.dto.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public record FavoriteRequest(
		Long id,
		String name,
		@JsonProperty("full_name") String fullName,
		@JsonProperty("html_url") String htmlUrl,
		String description,
		@JsonProperty("created_at") LocalDateTime createdAt
) {}
