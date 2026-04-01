package com.ecommerce.web.interceptor;

import com.ecommerce.common.JwtUtil;
import com.ecommerce.common.Result;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 认证拦截器
 * 拦截需要认证的请求，验证 JWT token，
 * 从 token 中提取用户ID和角色信息放入请求上下文
 */
@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 从请求头获取 Authorization
        String authHeader = request.getHeader("Authorization");

        // 检查 token 是否存在
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            writeUnauthorizedResponse(response);
            return false;
        }

        // 去掉 "Bearer " 前缀，提取 token
        String token = authHeader.substring(7).trim();
        if (token.isEmpty()) {
            writeUnauthorizedResponse(response);
            return false;
        }

        // 验证 token 有效性
        if (!jwtUtil.validateToken(token)) {
            writeUnauthorizedResponse(response);
            return false;
        }

        // 从 token 中提取用户ID和角色，放入请求属性
        Long userId = jwtUtil.getUserIdFromToken(token);
        String role = jwtUtil.getRoleFromToken(token);
        request.setAttribute("userId", userId);
        request.setAttribute("role", role);

        return true;
    }

    /**
     * 写入 401 未认证的 JSON 响应
     */
    private void writeUnauthorizedResponse(HttpServletResponse response) throws Exception {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");
        Result<?> result = Result.error(401, "未认证");
        response.getWriter().write(objectMapper.writeValueAsString(result));
    }
}
