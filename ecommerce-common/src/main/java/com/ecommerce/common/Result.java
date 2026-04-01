package com.ecommerce.common;

/**
 * 统一响应类
 * 所有 API 接口返回统一的 Result 格式，包含 code、message、data 字段
 *
 * @param <T> 响应数据类型
 */
public class Result<T> {

    /** 状态码：200 成功，其他为错误码 */
    private int code;

    /** 提示信息 */
    private String message;

    /** 响应数据 */
    private T data;

    public Result() {
    }

    public Result(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    /**
     * 返回成功响应（带数据）
     *
     * @param data 响应数据
     * @param <T>  数据类型
     * @return 成功的 Result 对象
     */
    public static <T> Result<T> success(T data) {
        return new Result<>(ErrorCode.SUCCESS, "success", data);
    }

    /**
     * 返回成功响应（无数据）
     *
     * @param <T> 数据类型
     * @return 成功的 Result 对象
     */
    public static <T> Result<T> success() {
        return new Result<>(ErrorCode.SUCCESS, "success", null);
    }

    /**
     * 返回错误响应
     *
     * @param code    错误码
     * @param message 错误信息
     * @param <T>     数据类型
     * @return 错误的 Result 对象
     */
    public static <T> Result<T> error(int code, String message) {
        return new Result<>(code, message, null);
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
