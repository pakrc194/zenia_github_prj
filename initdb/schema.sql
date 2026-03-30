USE github_db;
-- github_db.favorite definition

CREATE TABLE `favorite` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `html_url` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `favorite_unique` (`full_name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- github_db.`search` definition

CREATE TABLE `search` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `visitor_id` varchar(64) NOT NULL,       -- 브라우저 식별자 (UUID 등)
  `name` varchar(100) NOT NULL,         -- 검색어
  `count` bigint(20) DEFAULT 1,            -- 해당 방문자의 검색 횟수
  `pinned` tinyint(1) DEFAULT 0,        -- 즐겨찾기/고정 여부
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 최근 검색 시간
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_visitor_name` (`visitor_id`, `name`), -- 핵심: 동일 방문자의 중복 키워드 방지
  KEY `idx_expiry` (`updated_at`)           -- 5일 경과 데이터 삭제용
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;