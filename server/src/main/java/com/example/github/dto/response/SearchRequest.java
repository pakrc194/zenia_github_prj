package com.example.github.dto.response;

public record SearchRequest(
		String visitorId,
		String name
) {
	public SearchRequest withName(String name) {
		return new SearchRequest(visitorId, name);
	}
	
}
