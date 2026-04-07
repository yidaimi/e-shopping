# Filter to Function Mapping

## Summary

No filter-to-function migrations were required for this project.

## Analysis

The source Vue 2 application does not use Vue filters (`{{ value | filterName }}`). Price formatting is done using helper methods (`getWhole()`, `getDecimal()`) called directly in templates, which is already the Vue 3 pattern.

## Migration Pattern (for reference)

If filters had been present, the migration pattern would be:

```html
<!-- Vue 2 -->
<p>{{ price | currency }}</p>

<!-- Vue 3 -->
<p>{{ formatCurrency(price) }}</p>
```

```javascript
// Vue 2 filter
Vue.filter('currency', val => `¥${val.toFixed(2)}`)

// Vue 3 utility function
export function formatCurrency(val) { return `¥${val.toFixed(2)}` }
```
