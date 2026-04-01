package com.ecommerce.web.controller;

import com.ecommerce.common.Result;
import com.ecommerce.model.vo.CartVO;
import com.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 购物车控制器
 * 提供购物车管理接口，所有接口需要认证（/api/cart/** 已在 WebMvcConfig 中配置拦截）
 */
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    /**
     * 查询当前用户购物车
     * 从请求属性中获取 userId（由 AuthInterceptor 设置），查询购物车内容
     *
     * @param request HTTP 请求，包含 AuthInterceptor 设置的 userId 属性
     * @return 购物车视图对象（包含商品项列表和总价）
     */
    @GetMapping
    public Result<CartVO> getCart(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        CartVO cartVO = cartService.getCart(userId);
        return Result.success(cartVO);
    }

    /**
     * 添加商品到购物车
     * 接收商品ID和数量，将商品添加到当前用户的购物车中
     *
     * @param params 请求体，包含 productId（商品ID）和 quantity（数量）字段
     * @param request HTTP 请求，包含 AuthInterceptor 设置的 userId 属性
     * @return 操作结果
     */
    @PostMapping
    public Result<Void> addToCart(@RequestBody Map<String, Object> params, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Long productId = Long.valueOf(params.get("productId").toString());
        int quantity = Integer.parseInt(params.get("quantity").toString());
        cartService.addToCart(userId, productId, quantity);
        return Result.success();
    }

    /**
     * 修改购物车商品数量
     *
     * @param id 购物车项ID
     * @param params 请求体，包含 quantity（新数量）字段
     * @return 操作结果
     */
    @PutMapping("/{id}")
    public Result<Void> updateQuantity(@PathVariable Long id, @RequestBody Map<String, Object> params) {
        int quantity = Integer.parseInt(params.get("quantity").toString());
        cartService.updateCartItemQuantity(id, quantity);
        return Result.success();
    }

    /**
     * 删除购物车中的商品
     *
     * @param id 购物车项ID
     * @return 操作结果
     */
    @DeleteMapping("/{id}")
    public Result<Void> removeCartItem(@PathVariable Long id) {
        cartService.removeCartItem(id);
        return Result.success();
    }
}
