package com.ecommerce.mapper;

import com.ecommerce.model.entity.CartItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 购物车项数据访问接口
 */
@Mapper
public interface CartItemMapper {

    /**
     * 按用户ID查询购物车列表
     * @param userId 用户ID
     * @return 购物车项列表
     */
    List<CartItem> findByUserId(Long userId);

    /**
     * 按用户ID和商品ID查询购物车项
     * @param userId 用户ID
     * @param productId 商品ID
     * @return 购物车项，不存在返回 null
     */
    CartItem findByUserIdAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);

    /**
     * 插入购物车项
     * @param cartItem 购物车项实体
     */
    void insert(CartItem cartItem);

    /**
     * 更新购物车项数量
     * @param id 购物车项ID
     * @param quantity 新数量
     */
    void updateQuantity(@Param("id") Long id, @Param("quantity") int quantity);

    /**
     * 按ID删除购物车项
     * @param id 购物车项ID
     */
    void deleteById(Long id);

    /**
     * 按用户ID清空购物车
     * @param userId 用户ID
     */
    void deleteByUserId(Long userId);

    /**
     * 按商品ID删除所有用户购物车中的该商品
     * @param productId 商品ID
     */
    void deleteByProductId(Long productId);
}
