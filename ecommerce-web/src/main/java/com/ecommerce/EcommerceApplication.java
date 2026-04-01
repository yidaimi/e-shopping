package com.ecommerce;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 电商网站 Spring Boot 启动类
 * <p>
 * 使用 @MapperScan 扫描 MyBatis Mapper 接口所在包，
 * 自动将 Mapper 接口注册为 Spring Bean。
 * </p>
 */
@SpringBootApplication
@MapperScan("com.ecommerce.mapper")
public class EcommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
    }
}
