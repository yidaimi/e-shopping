package com.ecommerce.web.controller;

import com.ecommerce.common.Result;
import com.ecommerce.model.vo.OrderVO;
import com.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 订单控制器
 * 提供订单管理接口，所有接口需要认证（/api/order/** 已在 WebMvcConfig 中配置拦截）
 */
@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * 创建订单
     * 根据当前用户的购物车内容创建订单，创建成功后清空购物车并扣减库存
     *
     * @param request HTTP 请求，包含 AuthInterceptor 设置的 userId 属性
     * @return 新创建的订单ID
     */
    @PostMapping
    public Result<Long> createOrder(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Long orderId = orderService.createOrder(userId);
        return Result.success(orderId);
    }

    /**
     * 查询当前用户订单列表
     * 从请求属性中获取 userId，查询该用户的所有订单
     *
     * @param request HTTP 请求，包含 AuthInterceptor 设置的 userId 属性
     * @return 订单视图对象列表
     */
    @GetMapping("/list")
    public Result<List<OrderVO>> listOrders(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        List<OrderVO> orderList = orderService.listOrders(userId);
        return Result.success(orderList);
    }

    /**
     * 查询订单详情
     * 根据订单ID查询订单完整信息（包含订单项列表）
     *
     * @param id 订单ID
     * @return 订单视图对象（包含订单项）
     */
    @GetMapping("/{id}")
    public Result<OrderVO> getOrderById(@PathVariable Long id) {
        OrderVO orderVO = orderService.getOrderById(id);
        return Result.success(orderVO);
    }
}
