package com.ecommerce.service;

import com.ecommerce.model.entity.User;

/**
 * 用户服务接口
 * 提供用户注册、登录、查询等功能
 */
public interface UserService {

    /**
     * 用户注册
     * @param username 用户名
     * @param password 密码（明文）
     * @param email 邮箱
     * @return 新创建的用户ID
     */
    Long register(String username, String password, String email);

    /**
     * 用户登录
     * @param username 用户名
     * @param password 密码（明文）
     * @return JWT token
     */
    String login(String username, String password);

    /**
     * 根据ID查询用户
     * @param id 用户ID
     * @return 用户实体
     */
    User getUserById(Long id);

    /**
     * 根据用户名查询用户
     * @param username 用户名
     * @return 用户实体，不存在返回 null
     */
    User getUserByUsername(String username);
}
