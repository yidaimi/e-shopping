# Vuex to Pinia Mapping / Vuex 到 Pinia 映射文档

## Summary
本项目的 Vue 2 源代码中**未使用 Vuex**。

状态管理通过以下方式实现：
- `localStorage` 存储 JWT token
- 各组件使用本地 `data()` / `ref()` 管理自身状态
- API 模块（`src/api/`）封装所有后端交互

因此无需进行 Vuex → Pinia 迁移。

## Migration Count: 0
No Vuex stores found. No Pinia stores created.
