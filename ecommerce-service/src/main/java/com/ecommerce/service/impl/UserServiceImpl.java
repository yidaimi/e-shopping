package com.ecommerce.service.impl;

import com.ecommerce.common.AuthException;
import com.ecommerce.common.BusinessException;
import com.ecommerce.common.ErrorCode;
import com.ecommerce.common.JwtUtil;
import com.ecommerce.common.NotFoundException;
import com.ecommerce.mapper.UserMapper;
import com.ecommerce.model.entity.User;
import com.ecommerce.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * 用户服务实现类
 * 实现用户注册、登录、查询等业务逻辑
 */
@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;

    /** BCrypt 密码编码器，用于密码加密和验证 */
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserServiceImpl(UserMapper userMapper, JwtUtil jwtUtil) {
        this.userMapper = userMapper;
        this.jwtUtil = jwtUtil;
    }

    /**
     * 用户注册
     * 1. 校验用户名唯一性
     * 2. BCrypt 加密密码
     * 3. 设置默认角色和创建时间
     * 4. 保存用户并返回ID
     */
    @Override
    public Long register(String username, String password, String email) {
        // 校验用户名是否已存在
        User existing = userMapper.findByUsername(username);
        if (existing != null) {
            throw new BusinessException(ErrorCode.CONFLICT, "用户名已存在");
        }

        // 构建用户对象
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setRole("USER");
        user.setCreatedAt(LocalDateTime.now());

        // 保存用户
        userMapper.insert(user);
        return user.getId();
    }

    /**
     * 用户登录
     * 1. 按用户名查询用户
     * 2. 验证密码
     * 3. 生成并返回 token
     */
    @Override
    public String login(String username, String password) {
        // 查询用户
        User user = userMapper.findByUsername(username);
        if (user == null) {
            throw new AuthException("用户名或密码错误");
        }

        // 验证密码
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new AuthException("用户名或密码错误");
        }

        // 使用 JwtUtil 生成 JWT token
        return jwtUtil.generateToken(user.getId(), user.getRole());
    }

    /**
     * 根据ID查询用户，不存在则抛出 NotFoundException
     */
    @Override
    public User getUserById(Long id) {
        User user = userMapper.findById(id);
        if (user == null) {
            throw new NotFoundException("用户不存在");
        }
        return user;
    }

    /**
     * 根据用户名查询用户
     */
    @Override
    public User getUserByUsername(String username) {
        return userMapper.findByUsername(username);
    }
}
