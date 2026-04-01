package com.ecommerce.service.impl;

import com.ecommerce.common.BusinessException;
import com.ecommerce.common.NotFoundException;
import com.ecommerce.mapper.CartItemMapper;
import com.ecommerce.mapper.ProductMapper;
import com.ecommerce.model.entity.Product;
import com.ecommerce.model.vo.PageResult;
import com.ecommerce.service.ProductService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 商品服务实现类
 * 实现商品浏览、搜索、管理员管理等业务逻辑
 */
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;
    private final CartItemMapper cartItemMapper;

    public ProductServiceImpl(ProductMapper productMapper, CartItemMapper cartItemMapper) {
        this.productMapper = productMapper;
        this.cartItemMapper = cartItemMapper;
    }

    /**
     * 分页查询商品列表
     * 计算偏移量后调用 Mapper 查询数据和总数
     */
    @Override
    public PageResult<Product> listProducts(int page, int size) {
        int offset = page * size;
        List<Product> list = productMapper.findAll(offset, size);
        long total = productMapper.count();
        return new PageResult<>(list, total, page, size);
    }

    /**
     * 按关键词搜索商品
     * 在商品名称和描述中模糊匹配关键词
     */
    @Override
    public PageResult<Product> searchProducts(String keyword, int page, int size) {
        int offset = page * size;
        List<Product> list = productMapper.search(keyword, offset, size);
        long total = productMapper.countByKeyword(keyword);
        return new PageResult<>(list, total, page, size);
    }

    /**
     * 查询商品详情，不存在则抛出 NotFoundException
     */
    @Override
    public Product getProductById(Long id) {
        Product product = productMapper.findById(id);
        if (product == null) {
            throw new NotFoundException("商品不存在");
        }
        return product;
    }

    /**
     * 新增商品
     * 1. 校验必填字段（名称、价格、库存）
     * 2. 设置创建时间和更新时间
     * 3. 插入数据库并返回商品ID
     */
    @Override
    public Long addProduct(Product product) {
        // 校验商品名称不为空
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new BusinessException("商品名称不能为空");
        }
        // 校验价格不为 null 且大于 0
        if (product.getPrice() == null || product.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException("商品价格必须大于0");
        }
        // 校验库存不为 null 且大于等于 0
        if (product.getStock() == null || product.getStock() < 0) {
            throw new BusinessException("商品库存不能为负数");
        }

        // 设置创建时间和更新时间
        LocalDateTime now = LocalDateTime.now();
        product.setCreatedAt(now);
        product.setUpdatedAt(now);

        productMapper.insert(product);
        return product.getId();
    }

    /**
     * 修改商品
     * 1. 校验商品是否存在
     * 2. 设置更新时间
     * 3. 更新数据库
     */
    @Override
    public void updateProduct(Product product) {
        // 校验商品是否存在
        Product existing = productMapper.findById(product.getId());
        if (existing == null) {
            throw new NotFoundException("商品不存在");
        }

        // 设置更新时间
        product.setUpdatedAt(LocalDateTime.now());
        productMapper.update(product);
    }

    /**
     * 删除商品
     * 1. 校验商品是否存在
     * 2. 级联清理购物车中的该商品
     * 3. 删除商品
     */
    @Override
    public void deleteProduct(Long id) {
        // 校验商品是否存在
        Product existing = productMapper.findById(id);
        if (existing == null) {
            throw new NotFoundException("商品不存在");
        }

        // 级联清理：删除所有用户购物车中的该商品
        cartItemMapper.deleteByProductId(id);
        // 删除商品
        productMapper.deleteById(id);
    }

    /**
     * 扣减库存
     * 调用 Mapper 扣减库存，返回值为 0 表示库存不足
     */
    @Override
    public void reduceStock(Long productId, int quantity) {
        int rows = productMapper.reduceStock(productId, quantity);
        if (rows == 0) {
            throw new BusinessException("库存不足");
        }
    }

    /**
     * 按标签分页查询商品
     */
    @Override
    public PageResult<Product> listProductsByTag(String tag, int page, int size) {
        int offset = page * size;
        List<Product> list = productMapper.findByTag(tag, offset, size);
        long total = productMapper.countByTag(tag);
        return new PageResult<>(list, total, page, size);
    }
}
