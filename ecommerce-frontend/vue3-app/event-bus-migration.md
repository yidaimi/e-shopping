# Event Bus Migration

## Summary

No event bus migration was required for this project.

## Analysis

The source Vue 2 application does not use a global event bus (`$on`, `$off`, `$once`). Component communication is done via:
- Props (parent → child)
- Events/`$emit` (child → parent)
- Vue Router (navigation)
- localStorage (token persistence)

## Migration Pattern (for reference)

If an event bus had been present, the migration pattern would be:

```javascript
// Vue 2 event bus
const bus = new Vue()
bus.$on('event', handler)
bus.$emit('event', data)

// Vue 3 with mitt
import mitt from 'mitt'
const emitter = mitt()
emitter.on('event', handler)
emitter.emit('event', data)
```
