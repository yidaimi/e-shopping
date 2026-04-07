# Dependency Migration Mapping

## Core Dependencies

| Vue 2 Package | Version | Vue 3 Package | Version | Notes |
|--------------|---------|---------------|---------|-------|
| vue | ^2.7.16 | vue | ^3.4.0 | Core framework upgrade |
| vue-router | ^3.6.5 | vue-router | ^4.3.0 | Routing library upgrade |
| vue-template-compiler | ^2.7.16 | @vue/compiler-sfc (built-in) | - | No longer a separate dependency |
| axios | ^1.6.0 | axios | ^1.6.0 | No change needed |
| core-js | ^3.8.3 | (removed) | - | Not needed with Vite |

## Build Tool Migration

| Vue 2 | Vue 3 | Notes |
|-------|-------|-------|
| @vue/cli-service ~5.0.0 | vite ^5.0.0 | Webpack → Vite |
| @vue/cli-plugin-babel ~5.0.0 | (removed) | Vite handles transpilation |
| @vue/cli-plugin-router ~5.0.0 | (removed) | Vue Router configured directly |
| vue.config.js | vite.config.js | Build configuration file |
| babel.config.js | (removed) | Vite uses esbuild |

## Dev Dependencies Added

| Package | Version | Purpose |
|---------|---------|---------|
| @vitejs/plugin-vue | ^5.0.0 | Vite Vue SFC support |
| vitest | latest | Unit testing |
| @vue/test-utils | latest | Vue component testing |
| jsdom | latest | Test DOM environment |
| @playwright/test | latest | E2E testing |
| pixelmatch | latest | Visual comparison |
| pngjs | latest | PNG processing |

## Configuration Changes

| Vue 2 | Vue 3 | Notes |
|-------|-------|-------|
| VUE_APP_* env vars | VITE_* env vars | Not applicable (no env vars used) |
| process.env.* | import.meta.env.* | Not applicable |
| devServer.proxy in vue.config.js | server.proxy in vite.config.js | Proxy config migrated |
| devServer.port: 4200 | server.port: 5173 | Default Vite port |
