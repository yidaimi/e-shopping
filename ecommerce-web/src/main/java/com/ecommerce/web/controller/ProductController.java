package com.ecommerce.web.controller;

import com.ecommerce.common.Result;
import com.ecommerce.model.entity.Product;
import com.ecommerce.model.vo.PageResult;
import com.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 商品控制器
 * 提供公开的商品浏览接口（/api/product）和管理员商品管理接口（/api/admin/product）
 */
@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    // ==================== 公开接口（不需要认证） ====================

    /**
     * 分页查询商品列表
     *
     * @param page 页码，从0开始，默认值0
     * @param size 每页大小，默认值10
     * @return 分页结果
     */
    @GetMapping("/api/product/list")
    public Result<PageResult<Product>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResult<Product> pageResult = productService.listProducts(page, size);
        return Result.success(pageResult);
    }

    /**
     * 搜索商品
     * 按关键词在商品名称和描述中搜索
     *
     * @param keyword 搜索关键词
     * @param page 页码，从0开始，默认值0
     * @param size 每页大小，默认值10
     * @return 分页结果
     */
    @GetMapping("/api/product/search")
    public Result<PageResult<Product>> search(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResult<Product> pageResult = productService.searchProducts(keyword, page, size);
        return Result.success(pageResult);
    }

    /**
     * 查询商品详情
     *
     * @param id 商品ID
     * @return 商品信息
     */
    @GetMapping("/api/product/{id}")
    public Result<Product> detail(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return Result.success(product);
    }

    /**
     * 按标签分页查询商品
     */
    @GetMapping("/api/product/tag/{tag}")
    public Result<PageResult<Product>> listByTag(
            @PathVariable String tag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        PageResult<Product> pageResult = productService.listProductsByTag(tag, page, size);
        return Result.success(pageResult);
    }

    // ==================== 管理员接口（需要认证） ====================

    /**
     * 新增商品（管理员）
     *
     * @param product 商品信息
     * @return 新创建的商品ID
     */
    @PostMapping("/api/admin/product")
    public Result<Long> add(@RequestBody Product product) {
        Long productId = productService.addProduct(product);
        return Result.success(productId);
    }

    /**
     * 修改商品（管理员）
     *
     * @param id 商品ID
     * @param product 商品信息
     * @return 操作结果
     */
    @PutMapping("/api/admin/product/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody Product product) {
        product.setId(id);
        productService.updateProduct(product);
        return Result.success();
    }

    /**
     * 删除商品（管理员）
     *
     * @param id 商品ID
     * @return 操作结果
     */
    @DeleteMapping("/api/admin/product/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        productService.deleteProduct(id);
        return Result.success();
    }
}
