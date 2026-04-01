package com.ecommerce.service;

import com.ecommerce.model.vo.CartVO;

import java.math.BigDecimal;

/**
 * 购物车服务接口
 * 提供购物车的增删改查、总价计算等功能
 */
public interface CartService {

    /**
     * 查询用户购物车
     * @param userId 用户ID
     * @return 购物车视图对象（包含商品项列表和总价）
     */
    CartVO getCart(Long userId);

    /**
     * 添加商品到购物车
     * @param userId 用户ID
     * @param productId 商品ID
     * @param quantity 数量
     */
    void addToCart(Long userId, Long productId, int quantity);

    /**
     * 修改购物车商品数量
     * @param cartItemId 购物车项ID
     * @param quantity 新数量
     */
    void updateCartItemQuantity(Long cartItemId, int quantity);

    /**
     * 删除购物车商品
     * @param cartItemId 购物车项ID
     */
    void removeCartItem(Long cartItemId);

    /**
     * 清空用户购物车
     * @param userId 用户ID
     */
    void clearCart(Long userId);

    /**
     * 计算购物车总价
     * @param userId 用户ID
     * @return 总价金额，购物车为空返回 BigDecimal.ZERO
     */
    BigDecimal calculateTotal(Long userId);

    /**
     * 按商品ID移除所有用户购物车中的该商品
     * @param productId 商品ID
     */
    void removeProductFromAllCarts(Long productId);
}
