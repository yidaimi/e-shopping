package com.ecommerce.common;

/**
 * 错误码常量类
 * 定义系统中所有标准错误码
 */
public final class ErrorCode {

    private ErrorCode() {
        // 私有构造函数，防止实例化
    }

    /** 成功 */
    public static final int SUCCESS = 200;

    /** 请求参数错误 */
    public static final int BAD_REQUEST = 400;

    /** 未认证或认证失败 */
    public static final int UNAUTHORIZED = 401;

    /** 资源不存在 */
    public static final int NOT_FOUND = 404;

    /** 冲突（用户名已存在） */
    public static final int CONFLICT = 409;

    /** 业务规则违反（库存不足） */
    public static final int BUSINESS_ERROR = 422;

    /** 服务器内部错误 */
    public static final int INTERNAL_ERROR = 500;
}
