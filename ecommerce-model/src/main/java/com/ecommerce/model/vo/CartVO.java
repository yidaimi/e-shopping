package com.ecommerce.model.vo;

import java.math.BigDecimal;
import java.util.List;

/**
 * 购物车视图对象
 * 包含购物车项列表和总价
 */
public class CartVO {

    /** 购物车项列表 */
    private List<CartItemVO> items;

    /** 购物车总价 */
    private BigDecimal totalPrice;

    public CartVO() {
    }

    public CartVO(List<CartItemVO> items, BigDecimal totalPrice) {
        this.items = items;
        this.totalPrice = totalPrice;
    }

    public List<CartItemVO> getItems() {
        return items;
    }

    public void setItems(List<CartItemVO> items) {
        this.items = items;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
}
