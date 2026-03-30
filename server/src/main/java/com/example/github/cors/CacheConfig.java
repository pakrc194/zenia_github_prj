package com.example.github.cors;

import java.time.Duration;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator;
import com.fasterxml.jackson.databind.jsontype.PolymorphicTypeValidator;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Configuration
@EnableCaching
public class CacheConfig {

	@SuppressWarnings("deprecation")
	@Bean
	public RedisCacheManager redisCacheManager(RedisConnectionFactory connectionFactory) {
	    ObjectMapper objectMapper = new ObjectMapper();
	    objectMapper.registerModule(new JavaTimeModule());
	    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
	    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

	    // record는 final이라 NON_FINAL 대신 EVERYTHING 사용
	    PolymorphicTypeValidator ptv = BasicPolymorphicTypeValidator.builder()
	            .allowIfBaseType(Object.class)
	            .build();
	    objectMapper.activateDefaultTyping(ptv, ObjectMapper.DefaultTyping.EVERYTHING);

	    GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer(objectMapper);

	    RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
	            .entryTtl(Duration.ofMinutes(10))
	            .disableCachingNullValues()
	            .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(serializer));

	    return RedisCacheManager.builder(connectionFactory)
	            .cacheDefaults(config)
	            .build();
	}
}