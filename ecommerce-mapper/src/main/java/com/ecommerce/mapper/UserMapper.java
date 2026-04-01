package com.ecommerce.mapper;

import com.ecommerce.model.entity.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户数据访问接口
 */
@Mapper
public interface UserMapper {

    /**
     * 插入用户
     * @param user 用户实体
     */
    void insert(User user);

    /**
     * 按用户名查询用户
     * @param username 用户名
     * @return 用户实体，不存在返回 null
     */
    User findByUsername(String username);

    /**
     * 按ID查询用户
     * @param id 用户ID
     * @return 用户实体，不存在返回 null
     */
    User findById(Long id);
}
