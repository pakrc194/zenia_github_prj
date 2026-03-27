package com.example.github.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.github.dto.response.FavoriteRequest;

@Mapper
public interface FavoriteMapper {
	@Select("select * from favorite order by created_at desc")
	List<FavoriteRequest> list();
	
	@Delete("delete from favorite where full_name = #{fullName}")
	int delete(String fullName);
	
	@Insert("""
			insert into favorite(name, full_name, html_url, description, created_at)
			values (#{name}, #{fullName}, #{htmlUrl}, #{description}, now())
			""")
	int insert(FavoriteRequest req);
	
	@Select("select count(*) from favorite where full_name = #{fullName}")
	int countByFullName(String fullName);
}
