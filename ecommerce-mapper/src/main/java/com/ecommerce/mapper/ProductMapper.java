package com.ecommerce.mapper;

import com.ecommerce.model.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 商品数据访问接口
 */
@Mapper
public interface ProductMapper {

    /**
     * 分页查询商品列表
     * @param offset 偏移量
     * @param size 每页大小
     * @return 商品列表
     */
    List<Product> findAll(@Param("offset") int offset, @Param("size") int size);

    /**
     * 查询商品总数
     * @return 商品总数
     */
    long count();

    /**
     * 按关键词搜索商品（名称或描述包含关键词）
     * @param keyword 搜索关键词
     * @param offset 偏移量
     * @param size 每页大小
     * @return 匹配的商品列表
     */
    List<Product> search(@Param("keyword") String keyword, @Param("offset") int offset, @Param("size") int size);

    /**
     * 按关键词搜索结果总数
     * @param keyword 搜索关键词
     * @return 匹配的商品总数
     */
    long countByKeyword(@Param("keyword") String keyword);

    /**
     * 按ID查询商品
     * @param id 商品ID
     * @return 商品实体，不存在返回 null
     */
    Product findById(Long id);

    /**
     * 插入商品
     * @param product 商品实体
     */
    void insert(Product product);

    /**
     * 更新商品信息
     * @param product 商品实体
     */
    void update(Product product);

    /**
     * 按ID删除商品
     * @param id 商品ID
     */
    void deleteById(Long id);

    /**
     * 扣减库存（库存充足时才扣减）
     * @param id 商品ID
     * @param quantity 扣减数量
     * @return 受影响行数，0 表示库存不足
     */
    int reduceStock(@Param("id") Long id, @Param("quantity") int quantity);

    /**
     * 按标签分页查询商品
     * @param tag 商品标签
     * @param offset 偏移量
     * @param size 每页大小
     * @return 匹配的商品列表
     */
    List<Product> findByTag(@Param("tag") String tag, @Param("offset") int offset, @Param("size") int size);

    /**
     * 按标签查询商品总数
     * @param tag 商品标签
     * @return 匹配的商品总数
     */
    long countByTag(@Param("tag") String tag);
}
