package com.ecommerce.mapper;

import com.ecommerce.model.entity.OrderItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 订单项数据访问接口
 */
@Mapper
public interface OrderItemMapper {

    /**
     * 批量插入订单项
     * @param items 订单项列表
     */
    void batchInsert(@Param("items") List<OrderItem> items);

    /**
     * 按订单ID查询订单项列表
     * @param orderId 订单ID
     * @return 订单项列表
     */
    List<OrderItem> findByOrderId(Long orderId);
}
