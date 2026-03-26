package com.example.github.dto.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SearchLogDto(
	Long id,
	String name,
	@JsonProperty("created_at")
	LocalDateTime createdAt,
	Boolean pinned
) {}
