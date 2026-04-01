package com.ecommerce.mapper;

import com.ecommerce.model.entity.OrderInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 订单数据访问接口
 */
@Mapper
public interface OrderInfoMapper {

    /**
     * 插入订单
     * @param orderInfo 订单实体
     */
    void insert(OrderInfo orderInfo);

    /**
     * 按用户ID查询订单列表
     * @param userId 用户ID
     * @return 订单列表
     */
    List<OrderInfo> findByUserId(Long userId);

    /**
     * 按ID查询订单
     * @param id 订单ID
     * @return 订单实体，不存在返回 null
     */
    OrderInfo findById(Long id);
}
