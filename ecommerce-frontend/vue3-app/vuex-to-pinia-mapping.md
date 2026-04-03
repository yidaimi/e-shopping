# Vuex to Pinia Mapping

## Summary
This project does **not** use Vuex for state management. State is managed via:
1. **localStorage** — JWT token storage (`token` key)
2. **Component-local reactive state** — `ref()` / `data()` in each component
3. **API service layer** — Direct HTTP calls via axios

No Vuex-to-Pinia migration was required.

## State Management Pattern
| State | Location | Vue 2 | Vue 3 |
|-------|---------|-------|-------|
| JWT Token | localStorage | localStorage.getItem/setItem | localStorage.getItem/setItem (unchanged) |
| Component data | Each .vue file | data() { return {...} } | ref() / reactive() |
| Loading state | ProductList.vue | data.loading | ref(false) |
| Form state | Login.vue, Register.vue | data.username/password | ref('') |
| Cart data | Cart.vue | data.cart | ref(null) |
| Orders data | OrderList.vue | data.orders | ref([]) |
