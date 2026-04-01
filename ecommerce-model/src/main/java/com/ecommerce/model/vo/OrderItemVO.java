package com.ecommerce.model.vo;

import java.math.BigDecimal;

/**
 * 订单项视图对象
 * 用于前端展示订单中的单个商品项信息
 */
public class OrderItemVO {

    /** 商品ID */
    private Long productId;

    /** 商品名称 */
    private String productName;

    /** 商品价格 */
    private BigDecimal productPrice;

    /** 数量 */
    private Integer quantity;

    public OrderItemVO() {
    }

    public OrderItemVO(Long productId, String productName, BigDecimal productPrice, Integer quantity) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
