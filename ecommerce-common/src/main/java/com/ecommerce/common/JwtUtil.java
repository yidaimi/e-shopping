package com.ecommerce.common;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * JWT 工具类
 * 提供 token 的生成、解析和验证功能
 */
@Component
public class JwtUtil {

    /** 签名密钥 */
    private static final String SECRET_KEY = "ecommerce_jwt_secret_key_2024_must_be_long_enough";

    /** token 过期时间：24 小时（毫秒） */
    private static final long EXPIRATION = 86400000L;

    /**
     * 生成 JWT token
     *
     * @param userId 用户ID
     * @param role   用户角色
     * @return JWT token 字符串
     */
    public String generateToken(Long userId, String role) {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        return Jwts.builder()
                .subject(userId.toString())
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    /**
     * 从 token 中提取用户ID
     *
     * @param token JWT token
     * @return 用户ID
     */
    public Long getUserIdFromToken(String token) {
        Claims claims = parseToken(token);
        return Long.parseLong(claims.getSubject());
    }

    /**
     * 从 token 中提取角色
     *
     * @param token JWT token
     * @return 角色字符串
     */
    public String getRoleFromToken(String token) {
        Claims claims = parseToken(token);
        return claims.get("role", String.class);
    }

    /**
     * 验证 token 是否有效
     *
     * @param token JWT token
     * @return true 表示有效，false 表示无效或已过期
     */
    public boolean validateToken(String token) {
        try {
            parseToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 解析 token，获取 Claims
     *
     * @param token JWT token
     * @return Claims 对象
     */
    private Claims parseToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
