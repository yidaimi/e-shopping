# Dependency Migration / 依赖迁移文档

## Core Dependencies

| Library | Vue 2 Version | Vue 3 Version | Migration Notes |
|---------|--------------|---------------|-----------------|
| vue | ^2.7.16 | ^3.4.0 | Options API → Composition API `<script setup>` |
| vue-router | ^3.6.5 | ^4.3.0 | `new VueRouter()` → `createRouter()`, `mode: 'history'` → `createWebHistory()`, `next()` → return values |
| vue-template-compiler | ^2.7.16 | Removed | Replaced by @vue/compiler-sfc (built into vue@3) |
| @vue/cli-service | ~5.0.0 | Removed | Replaced by Vite |
| @vue/cli-plugin-babel | ~5.0.0 | Removed | Vite handles transpilation |
| @vue/cli-plugin-router | ~5.0.0 | Removed | vue-router@4 installed directly |
| core-js | ^3.8.3 | Removed | Vite uses native ES modules |
| axios | ^1.6.0 | ^1.6.0 | No change (framework-agnostic) |

## Build Tool Migration

| Feature | Vue CLI (webpack) | Vite |
|---------|------------------|------|
| Config file | vue.config.js | vite.config.ts |
| Dev server | `vue-cli-service serve` | `vite` |
| Build | `vue-cli-service build` | `vite build` |
| Proxy | devServer.proxy | server.proxy |
| Path alias | webpack resolve.alias | resolve.alias with fileURLToPath |
| Env vars | VUE_APP_* / process.env | VITE_* / import.meta.env |
| Port | 4200 (configured) | 5173 (default) |

## New Dev Dependencies Added

| Library | Version | Purpose |
|---------|---------|---------|
| @vitejs/plugin-vue | ^5.0.0 | Vue 3 SFC support for Vite |
| vite | ^5.4.0 | Build tool |
| vitest | ^1.6.0 | Unit testing |
| @vue/test-utils | ^2.4.0 | Vue component testing |
| jsdom | ^24.0.0 | DOM environment for tests |
| @playwright/test | ^1.40.0 | E2E testing |
| pixelmatch | ^5.3.0 | Visual regression comparison |
| pngjs | ^7.0.0 | PNG image parsing |
