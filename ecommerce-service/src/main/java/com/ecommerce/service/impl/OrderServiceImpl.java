package com.ecommerce.service.impl;

import com.ecommerce.common.BusinessException;
import com.ecommerce.common.NotFoundException;
import com.ecommerce.mapper.CartItemMapper;
import com.ecommerce.mapper.OrderInfoMapper;
import com.ecommerce.mapper.OrderItemMapper;
import com.ecommerce.mapper.ProductMapper;
import com.ecommerce.model.entity.CartItem;
import com.ecommerce.model.entity.OrderInfo;
import com.ecommerce.model.entity.OrderItem;
import com.ecommerce.model.entity.Product;
import com.ecommerce.model.vo.OrderItemVO;
import com.ecommerce.model.vo.OrderVO;
import com.ecommerce.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 订单服务实现类
 * 实现订单创建（含事务管理）、订单列表查询、订单详情查询等业务逻辑
 */
@Service
public class OrderServiceImpl implements OrderService {

    private final OrderInfoMapper orderInfoMapper;
    private final OrderItemMapper orderItemMapper;
    private final CartItemMapper cartItemMapper;
    private final ProductMapper productMapper;

    public OrderServiceImpl(OrderInfoMapper orderInfoMapper,
                            OrderItemMapper orderItemMapper,
                            CartItemMapper cartItemMapper,
                            ProductMapper productMapper) {
        this.orderInfoMapper = orderInfoMapper;
        this.orderItemMapper = orderItemMapper;
        this.cartItemMapper = cartItemMapper;
        this.productMapper = productMapper;
    }

    /**
     * 根据购物车创建订单
     * 1. 查询用户购物车，购物车为空则抛出异常
     * 2. 计算订单总金额（遍历购物车项，查询商品价格 × 数量）
     * 3. 创建订单记录
     * 4. 为每个购物车项创建订单项（快照商品名称和价格）
     * 5. 批量保存订单项
     * 6. 扣减商品库存，库存不足时抛出异常并回滚事务
     * 7. 清空用户购物车
     */
    @Override
    @Transactional
    public Long createOrder(Long userId) {
        // 1. 查询用户购物车
        List<CartItem> cartItems = cartItemMapper.findByUserId(userId);
        if (cartItems == null || cartItems.isEmpty()) {
            throw new BusinessException("购物车为空");
        }

        // 2. 计算订单总金额
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<Product> products = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            Product product = productMapper.findById(cartItem.getProductId());
            products.add(product);
            // 小计 = 商品价格 × 数量
            BigDecimal subtotal = product.getPrice().multiply(new BigDecimal(cartItem.getQuantity()));
            totalAmount = totalAmount.add(subtotal);
        }

        // 3. 创建订单记录
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setUserId(userId);
        orderInfo.setTotalAmount(totalAmount);
        orderInfo.setStatus("CREATED");
        orderInfo.setCreatedAt(LocalDateTime.now());
        orderInfoMapper.insert(orderInfo);

        // 4. 为每个购物车项创建订单项（快照商品名称和价格）
        List<OrderItem> orderItems = new ArrayList<>();
        for (int i = 0; i < cartItems.size(); i++) {
            CartItem cartItem = cartItems.get(i);
            Product product = products.get(i);
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(orderInfo.getId());
            orderItem.setProductId(cartItem.getProductId());
            orderItem.setProductName(product.getName());
            orderItem.setProductPrice(product.getPrice());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItems.add(orderItem);
        }

        // 5. 批量保存订单项
        orderItemMapper.batchInsert(orderItems);

        // 6. 扣减商品库存，库存不足时抛出异常并回滚事务
        for (int i = 0; i < cartItems.size(); i++) {
            CartItem cartItem = cartItems.get(i);
            Product product = products.get(i);
            int affected = productMapper.reduceStock(cartItem.getProductId(), cartItem.getQuantity());
            if (affected == 0) {
                throw new BusinessException("商品[" + product.getName() + "]库存不足");
            }
        }

        // 7. 清空用户购物车
        cartItemMapper.deleteByUserId(userId);

        return orderInfo.getId();
    }

    /**
     * 查询用户订单列表
     * 1. 查询用户的所有订单
     * 2. 遍历每个订单，查询对应的订单项
     * 3. 构建 OrderVO 列表返回
     */
    @Override
    public List<OrderVO> listOrders(Long userId) {
        List<OrderInfo> orders = orderInfoMapper.findByUserId(userId);
        List<OrderVO> orderVOList = new ArrayList<>();

        for (OrderInfo order : orders) {
            // 查询订单项
            List<OrderItem> orderItems = orderItemMapper.findByOrderId(order.getId());
            // 构建订单项 VO 列表
            List<OrderItemVO> itemVOList = buildOrderItemVOList(orderItems);
            // 构建订单 VO
            OrderVO orderVO = new OrderVO(
                    order.getId(),
                    order.getTotalAmount(),
                    order.getStatus(),
                    order.getCreatedAt(),
                    itemVOList
            );
            orderVOList.add(orderVO);
        }

        return orderVOList;
    }

    /**
     * 查询订单详情
     * 1. 按ID查询订单，不存在则抛出异常
     * 2. 查询订单项列表
     * 3. 构建 OrderVO 返回
     */
    @Override
    public OrderVO getOrderById(Long orderId) {
        // 查询订单
        OrderInfo orderInfo = orderInfoMapper.findById(orderId);
        if (orderInfo == null) {
            throw new NotFoundException("订单不存在");
        }

        // 查询订单项
        List<OrderItem> orderItems = orderItemMapper.findByOrderId(orderId);
        List<OrderItemVO> itemVOList = buildOrderItemVOList(orderItems);

        return new OrderVO(
                orderInfo.getId(),
                orderInfo.getTotalAmount(),
                orderInfo.getStatus(),
                orderInfo.getCreatedAt(),
                itemVOList
        );
    }

    /**
     * 将订单项实体列表转换为订单项 VO 列表
     * @param orderItems 订单项实体列表
     * @return 订单项 VO 列表
     */
    private List<OrderItemVO> buildOrderItemVOList(List<OrderItem> orderItems) {
        List<OrderItemVO> itemVOList = new ArrayList<>();
        for (OrderItem item : orderItems) {
            OrderItemVO itemVO = new OrderItemVO(
                    item.getProductId(),
                    item.getProductName(),
                    item.getProductPrice(),
                    item.getQuantity()
            );
            itemVOList.add(itemVO);
        }
        return itemVOList;
    }
}
