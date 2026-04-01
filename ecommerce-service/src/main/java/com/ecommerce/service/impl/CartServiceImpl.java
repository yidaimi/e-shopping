package com.ecommerce.service.impl;

import com.ecommerce.common.BusinessException;
import com.ecommerce.common.NotFoundException;
import com.ecommerce.mapper.CartItemMapper;
import com.ecommerce.mapper.ProductMapper;
import com.ecommerce.model.entity.CartItem;
import com.ecommerce.model.entity.Product;
import com.ecommerce.model.vo.CartItemVO;
import com.ecommerce.model.vo.CartVO;
import com.ecommerce.service.CartService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * 购物车服务实现类
 * 实现购物车的增删改查、总价计算等业务逻辑
 */
@Service
public class CartServiceImpl implements CartService {

    private final CartItemMapper cartItemMapper;
    private final ProductMapper productMapper;

    public CartServiceImpl(CartItemMapper cartItemMapper, ProductMapper productMapper) {
        this.cartItemMapper = cartItemMapper;
        this.productMapper = productMapper;
    }

    /**
     * 查询用户购物车
     * 1. 查询用户的所有购物车项
     * 2. 遍历每个购物车项，查询对应商品信息
     * 3. 构建 CartItemVO 列表，计算每项小计和总价
     */
    @Override
    public CartVO getCart(Long userId) {
        List<CartItem> cartItems = cartItemMapper.findByUserId(userId);
        List<CartItemVO> itemVOList = new ArrayList<>();
        BigDecimal totalPrice = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {
            Product product = productMapper.findById(cartItem.getProductId());
            if (product != null) {
                // 计算小计 = 商品价格 × 数量
                BigDecimal subtotal = product.getPrice().multiply(new BigDecimal(cartItem.getQuantity()));
                CartItemVO itemVO = new CartItemVO(
                        cartItem.getId(),
                        cartItem.getProductId(),
                        product.getName(),
                        product.getPrice(),
                        product.getImageUrl(),
                        cartItem.getQuantity(),
                        subtotal
                );
                itemVOList.add(itemVO);
                // 累加总价
                totalPrice = totalPrice.add(subtotal);
            }
        }

        return new CartVO(itemVOList, totalPrice);
    }

    /**
     * 添加商品到购物车
     * 1. 校验商品是否存在
     * 2. 校验库存是否充足
     * 3. 如果购物车中已有该商品，则增加数量；否则新建购物车项
     */
    @Override
    public void addToCart(Long userId, Long productId, int quantity) {
        // 查询商品是否存在
        Product product = productMapper.findById(productId);
        if (product == null) {
            throw new NotFoundException("商品不存在");
        }

        // 校验库存是否充足
        if (product.getStock() < quantity) {
            throw new BusinessException("库存不足");
        }

        // 查询购物车中是否已有该商品
        CartItem existingItem = cartItemMapper.findByUserIdAndProductId(userId, productId);
        if (existingItem != null) {
            // 已有该商品，更新数量（原数量 + 新数量）
            int newQuantity = existingItem.getQuantity() + quantity;
            cartItemMapper.updateQuantity(existingItem.getId(), newQuantity);
        } else {
            // 没有该商品，创建新的购物车项并插入
            CartItem cartItem = new CartItem();
            cartItem.setUserId(userId);
            cartItem.setProductId(productId);
            cartItem.setQuantity(quantity);
            cartItemMapper.insert(cartItem);
        }
    }

    /**
     * 修改购物车商品数量
     */
    @Override
    public void updateCartItemQuantity(Long cartItemId, int quantity) {
        cartItemMapper.updateQuantity(cartItemId, quantity);
    }

    /**
     * 删除购物车商品
     */
    @Override
    public void removeCartItem(Long cartItemId) {
        cartItemMapper.deleteById(cartItemId);
    }

    /**
     * 清空用户购物车
     */
    @Override
    public void clearCart(Long userId) {
        cartItemMapper.deleteByUserId(userId);
    }

    /**
     * 计算购物车总价
     * 遍历购物车项，查询每个商品价格并计算小计之和
     * 购物车为空时返回 BigDecimal.ZERO
     */
    @Override
    public BigDecimal calculateTotal(Long userId) {
        List<CartItem> cartItems = cartItemMapper.findByUserId(userId);
        if (cartItems == null || cartItems.isEmpty()) {
            return BigDecimal.ZERO;
        }

        BigDecimal total = BigDecimal.ZERO;
        for (CartItem cartItem : cartItems) {
            Product product = productMapper.findById(cartItem.getProductId());
            if (product != null) {
                // 小计 = 商品价格 × 数量
                BigDecimal subtotal = product.getPrice().multiply(new BigDecimal(cartItem.getQuantity()));
                total = total.add(subtotal);
            }
        }
        return total;
    }

    /**
     * 按商品ID移除所有用户购物车中的该商品
     * 供商品删除时级联清理调用
     */
    @Override
    public void removeProductFromAllCarts(Long productId) {
        cartItemMapper.deleteByProductId(productId);
    }
}
