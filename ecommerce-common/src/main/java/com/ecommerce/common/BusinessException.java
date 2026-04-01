package com.ecommerce.common;

/**
 * 通用业务异常
 * 用于库存不足、用户名重复等业务规则违反场景
 */
public class BusinessException extends RuntimeException {

    /** 错误码 */
    private final int code;

    public BusinessException(String message) {
        super(message);
        this.code = ErrorCode.BUSINESS_ERROR;
    }

    public BusinessException(int code, String message) {
        super(message);
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
