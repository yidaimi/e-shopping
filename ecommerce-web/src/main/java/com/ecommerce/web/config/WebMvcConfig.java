package com.ecommerce.web.config;

import com.ecommerce.web.interceptor.AuthInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web MVC 配置类
 * 配置认证拦截器的拦截路径和排除路径，以及跨域访问设置
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private AuthInterceptor authInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                // 需要认证的路径
                .addPathPatterns(
                        "/api/cart/**",
                        "/api/order/**",
                        "/api/user/info",
                        "/api/admin/**"
                )
                // 排除不需要认证的路径
                .excludePathPatterns(
                        "/api/user/register",
                        "/api/user/login",
                        "/api/product/**"
                );
    }

    /**
     * 配置跨域资源共享（CORS），允许前端开发服务器跨域访问后端 API
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                // 允许 Angular 开发服务器的来源
                .allowedOrigins("http://localhost:4200")
                // 允许的 HTTP 方法
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // 允许所有请求头
                .allowedHeaders("*")
                // 允许携带凭证（如 Cookie、Authorization 头）
                .allowCredentials(true);
    }
}
