# Dependency Migration Mapping

## Core Dependencies

| Package | Vue 2 Version | Vue 3 Version | Notes |
|---------|--------------|---------------|-------|
| vue | ^2.7.16 | ^3.4.0 | Major version upgrade |
| vue-router | ^3.6.5 | ^4.3.0 | Major version upgrade |
| axios | ^1.6.0 | ^1.6.0 | No change needed |
| core-js | ^3.8.3 | Removed | Not needed with Vite |

## Build Tool Migration

| Vue 2 (Vue CLI / Webpack) | Vue 3 (Vite) | Notes |
|---------------------------|-------------|-------|
| @vue/cli-service ~5.0.0 | vite ^5.0.0 | Webpack → Vite |
| @vue/cli-plugin-babel ~5.0.0 | Removed | Vite handles transforms |
| @vue/cli-plugin-router ~5.0.0 | Removed | Router configured manually |
| vue-template-compiler ^2.7.16 | @vitejs/plugin-vue ^5.0.0 | Template compilation |
| babel.config.js | Removed | Not needed with Vite |
| vue.config.js | vite.config.js | Configuration file |

## Dev Dependencies Added

| Package | Version | Purpose |
|---------|---------|---------|
| @vitejs/plugin-vue | ^5.0.0 | Vue SFC support in Vite |
| vite | ^5.0.0 | Build tool |
| vitest | ^4.1.0 | Unit testing |
| @vue/test-utils | ^2.x | Component testing |
| jsdom | latest | Test environment |
| @playwright/test | ^1.40.0 | E2E testing |
| pixelmatch | ^5.3.0 | Visual comparison |
| pngjs | ^7.0.0 | PNG image processing |

## Configuration Changes

| vue.config.js | vite.config.js |
|---------------|---------------|
| devServer.port: 4200 | server.port: 5173 |
| devServer.proxy /api → localhost:8080 | server.proxy /api → localhost:8080 |
| transpileDependencies: true | Not needed (ESM native) |
