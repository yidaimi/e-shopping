# Filter to Function Mapping / Filter 到函数映射文档

## Summary
本项目的 Vue 2 源代码中**未使用任何 Vue Filter**（`{{ value | filterName }}`）。

价格格式化等功能通过组件内的 methods（现已转换为普通函数）实现：
- `getWhole(price)` - 获取价格整数部分（千分位格式化）
- `getDecimal(price)` - 获取价格小数部分（两位）

这些函数在模板中直接调用：`{{ getWhole(product.price) }}`

## Migration Count: 0
No Vue filters found in source code.
