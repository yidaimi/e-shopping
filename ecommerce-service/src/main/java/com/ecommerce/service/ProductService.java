package com.ecommerce.service;

import com.ecommerce.model.entity.Product;
import com.ecommerce.model.vo.PageResult;

/**
 * 商品服务接口
 * 提供商品浏览、搜索、管理员管理等功能
 */
public interface ProductService {

    /**
     * 分页查询商品列表
     * @param page 页码（从0开始）
     * @param size 每页大小
     * @return 分页结果
     */
    PageResult<Product> listProducts(int page, int size);

    /**
     * 按关键词搜索商品
     * @param keyword 搜索关键词
     * @param page 页码（从0开始）
     * @param size 每页大小
     * @return 分页结果
     */
    PageResult<Product> searchProducts(String keyword, int page, int size);

    /**
     * 查询商品详情
     * @param id 商品ID
     * @return 商品实体
     */
    Product getProductById(Long id);

    /**
     * 新增商品（管理员）
     * @param product 商品实体
     * @return 新创建的商品ID
     */
    Long addProduct(Product product);

    /**
     * 修改商品（管理员）
     * @param product 商品实体
     */
    void updateProduct(Product product);

    /**
     * 删除商品（管理员）
     * @param id 商品ID
     */
    void deleteProduct(Long id);

    /**
     * 扣减库存
     * @param productId 商品ID
     * @param quantity 扣减数量
     */
    void reduceStock(Long productId, int quantity);

    /**
     * 按标签分页查询商品
     */
    PageResult<Product> listProductsByTag(String tag, int page, int size);
}
