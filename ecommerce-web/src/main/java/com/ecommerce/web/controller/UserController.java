package com.ecommerce.web.controller;

import com.ecommerce.common.Result;
import com.ecommerce.model.entity.User;
import com.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 用户控制器
 * 提供用户注册、登录、获取用户信息接口
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 用户注册
     * 接收用户名、密码、邮箱，创建新用户
     *
     * @param params 请求体，包含 username、password、email 字段
     * @return 新创建的用户ID
     */
    @PostMapping("/register")
    public Result<Long> register(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String password = params.get("password");
        String email = params.get("email");
        Long userId = userService.register(username, password, email);
        return Result.success(userId);
    }

    /**
     * 用户登录
     * 验证用户名和密码，返回 JWT token
     *
     * @param params 请求体，包含 username、password 字段
     * @return JWT token
     */
    @PostMapping("/login")
    public Result<String> login(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String password = params.get("password");
        String token = userService.login(username, password);
        return Result.success(token);
    }

    /**
     * 获取当前用户信息（需认证）
     * 从请求属性中获取 userId（由 AuthInterceptor 设置），查询用户信息
     * 返回时隐藏密码字段
     *
     * @param request HTTP 请求，包含 AuthInterceptor 设置的 userId 属性
     * @return 用户信息（不含密码）
     */
    @GetMapping("/info")
    public Result<User> info(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        User user = userService.getUserById(userId);
        // 隐藏密码字段，不返回给前端
        user.setPassword(null);
        return Result.success(user);
    }
}
