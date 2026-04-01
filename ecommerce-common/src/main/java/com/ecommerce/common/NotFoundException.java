package com.ecommerce.common;

/**
 * 资源不存在异常
 * 用于商品不存在、订单不存在等资源未找到场景
 */
public class NotFoundException extends RuntimeException {

    /** 错误码 */
    private final int code;

    public NotFoundException(String message) {
        super(message);
        this.code = ErrorCode.NOT_FOUND;
    }

    public int getCode() {
        return code;
    }
}
