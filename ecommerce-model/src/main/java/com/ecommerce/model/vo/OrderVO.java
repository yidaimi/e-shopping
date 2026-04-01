package com.ecommerce.model.vo;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 订单视图对象
 * 包含订单基本信息和订单项列表
 */
public class OrderVO {

    /** 订单ID */
    private Long id;

    /** 订单总金额 */
    private BigDecimal totalAmount;

    /** 订单状态 */
    private String status;

    /** 创建时间 */
    private LocalDateTime createdAt;

    /** 订单项列表 */
    private List<OrderItemVO> items;

    public OrderVO() {
    }

    public OrderVO(Long id, BigDecimal totalAmount, String status,
                   LocalDateTime createdAt, List<OrderItemVO> items) {
        this.id = id;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<OrderItemVO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemVO> items) {
        this.items = items;
    }
}
