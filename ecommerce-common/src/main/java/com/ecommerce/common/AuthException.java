package com.ecommerce.common;

/**
 * 认证失败异常
 * 用于密码错误、token 无效或过期等认证失败场景
 */
public class AuthException extends RuntimeException {

    /** 错误码 */
    private final int code;

    public AuthException(String message) {
        super(message);
        this.code = ErrorCode.UNAUTHORIZED;
    }

    public int getCode() {
        return code;
    }
}
