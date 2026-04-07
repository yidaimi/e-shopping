# Event Bus Migration / 事件总线迁移文档

## Summary
本项目的 Vue 2 源代码中**未使用事件总线**（`$on/$off/$once` 或 `new Vue()` 作为事件总线）。

组件间通信通过以下方式实现：
- 父→子：props 传递数据
- 子→父：$emit 发送事件（现使用 `defineEmits()`）
- 路由参数：`$route.query` 和 `$route.params`

## Migration Count: 0
No event bus patterns found in source code. No mitt or provide/inject replacements needed.
