# Filter to Function Mapping

## Summary
This project does **not** use any Vue 2 template filters (`{{ value | filterName }}`).

Price formatting is done via direct method calls in templates:
- `{{ getWhole(product.price) }}` — Gets integer part
- `{{ getDecimal(product.price) }}` — Gets decimal part

These were already plain methods in Vue 2 and remain plain functions in Vue 3. No filter migration was required.
