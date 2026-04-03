# Event Bus Migration

## Summary
This project does **not** use a Vue 2 event bus (`$on`, `$off`, `$once`, `new Vue()` as event bus).

Component communication is done via:
1. **Props** — Parent → child data flow
2. **Events** ($emit / defineEmits) — Child → parent communication
3. **Vue Router** — Navigation-based communication (query params, route params)
4. **Direct API calls** — Components call API services directly

No event bus migration was required.
