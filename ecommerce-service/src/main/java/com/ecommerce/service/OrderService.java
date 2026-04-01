package com.ecommerce.service;

import com.ecommerce.model.vo.OrderVO;

import java.util.List;

/**
 * 订单服务接口
 * 提供订单创建、查询等功能
 */
public interface OrderService {

    /**
     * 根据购物车创建订单
     * @param userId 用户ID
     * @return 新创建的订单ID
     */
    Long createOrder(Long userId);

    /**
     * 查询用户订单列表
     * @param userId 用户ID
     * @return 订单视图对象列表
     */
    List<OrderVO> listOrders(Long userId);

    /**
     * 查询订单详情
     * @param orderId 订单ID
     * @return 订单视图对象（包含订单项）
     */
    OrderVO getOrderById(Long orderId);
}
