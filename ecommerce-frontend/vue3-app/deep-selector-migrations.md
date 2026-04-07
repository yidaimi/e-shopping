# Deep Selector Migrations / 深度选择器迁移文档

## Summary
本项目的 Vue 2 源代码中**未使用任何深度选择器**（`>>>`, `/deep/`, `::v-deep`）。

所有组件均使用 `<style scoped>` 且仅包含直接选择器，无需进行深度选择器迁移。

## Vue 3 Deep Selector Reference
如果需要在 Vue 3 中使用深度选择器，应使用以下语法：
- Vue 2: `>>>`, `/deep/`, `::v-deep`
- Vue 3: `:deep()` 函数选择器

示例：
```css
/* Vue 2 */
::v-deep .child-class { color: red; }

/* Vue 3 */
:deep(.child-class) { color: red; }
```

## Migration Count: 0
No deep selectors found in source code.
