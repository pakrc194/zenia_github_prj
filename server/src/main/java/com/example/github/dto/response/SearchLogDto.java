package com.example.github.dto.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SearchLogDto(
	Long id,
	@JsonProperty("visitor_id")
	String visitorId,
	String name,
	Long count,
	Boolean pinned,
	@JsonProperty("updated_at")
	LocalDateTime updatedAt,
	@JsonProperty("created_at")
	LocalDateTime createdAt
) {}
