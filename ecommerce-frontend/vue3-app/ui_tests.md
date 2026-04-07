# UI Behavior Test Cases

Extracted from Vue 2 source code analysis of all interactive components.

## AppHeader Component

- TC-HDR-01: [Click logo "E-Shop"] - [Navigate to /products]
- TC-HDR-02: [Type "手机" in search bar and press Enter] - [Navigate to /products?keyword=手机]
- TC-HDR-03: [Type "手机" in search bar and click 🔍 button] - [Navigate to /products?keyword=手机]
- TC-HDR-04: [Clear search bar and press Enter] - [Navigate to /products (no query)]
- TC-HDR-05: [Click "今日特惠" in sub-nav] - [Navigate to /products?tag=TODAY_DEAL]
- TC-HDR-06: [Click "新品上市" in sub-nav] - [Navigate to /products?tag=NEW]
- TC-HDR-07: [Click "热销排行" in sub-nav] - [Navigate to /products?tag=HOT]
- TC-HDR-08: [Click "品牌精选" in sub-nav] - [Navigate to /products?tag=BRAND]
- TC-HDR-09: [Click "全部商品" in sub-nav] - [Navigate to /products]
- TC-HDR-10: [When not logged in, verify header shows "你好，请登录" and "新用户？免费注册"] - [Login and register links visible]
- TC-HDR-11: [When logged in, verify header shows "我的订单" and "退出登录"] - [Orders link and logout visible]
- TC-HDR-12: [Click "退出登录" when logged in] - [Token removed from localStorage, redirected to /login]
- TC-HDR-13: [Click "购物车" link] - [Navigate to /cart]

## Login Page

- TC-LOGIN-01: [Navigate to /login] - [Login form with username, password fields and "登录" button displayed]
- TC-LOGIN-02: [Enter valid credentials and click "登录"] - [Token saved to localStorage, navigate to /products]
- TC-LOGIN-03: [Enter invalid credentials and click "登录"] - [Error message displayed: "登录失败，请检查用户名和密码"]
- TC-LOGIN-04: [Click "去注册" link] - [Navigate to /register]

## Register Page

- TC-REG-01: [Navigate to /register] - [Register form with username, password, email fields and "注册" button displayed]
- TC-REG-02: [Enter valid registration data and click "注册"] - [Success message "注册成功，即将跳转到登录页..." displayed, then redirect to /login after 1.5s]
- TC-REG-03: [Enter invalid registration data and click "注册"] - [Error message displayed]
- TC-REG-04: [Click "去登录" link] - [Navigate to /login]

## ProductList Page

- TC-PL-01: [Navigate to /products] - [Hero banner displayed with "欢迎来到 E-Shop" text]
- TC-PL-02: [Navigate to /products] - [Product grid with product cards displayed]
- TC-PL-03: [Navigate to /products?keyword=test] - [Search result hint "搜索 "test" 的结果" displayed, hero banner hidden]
- TC-PL-04: [Navigate to /products?tag=TODAY_DEAL] - [Tag label "🔥 今日特惠" displayed, hero banner hidden]
- TC-PL-05: [Click a product card] - [Navigate to /product/:id]
- TC-PL-06: [When products total > pageSize, pagination component visible] - [Pagination shows page numbers]
- TC-PL-07: [Click page 2 in pagination] - [Products reload for page 1 (0-indexed), scroll to top]
- TC-PL-08: [When no products found] - [Empty state with 📦 icon and "暂无商品数据" shown]

## ProductCard Component

- TC-PC-01: [Product card displays] - [Shows product image, name, description, stars, stock, price (¥whole.decimal), "免费配送"]
- TC-PC-02: [Click product card] - [Navigate to /product/:id]
- TC-PC-03: [Product image fails to load] - [Fallback image from picsum.photos displayed]
- TC-PC-04: [Price 123.45 displayed] - [Shows ¥123.45 with whole=123 and decimal=45]

## ProductDetail Page

- TC-PD-01: [Navigate to /product/:id] - [Product details displayed: image, name, description, price, stock, quantity input, "加入购物车" button]
- TC-PD-02: [Product stock ≤ 5] - [Stock number shown in red bold]
- TC-PD-03: [Set quantity to 3 and click "加入购物车" (logged in)] - [Success message "已加入购物车" displayed]
- TC-PD-04: [Click "加入购物车" (not logged in)] - [Redirect to /login]
- TC-PD-05: [Set quantity to 0 and change] - [Quantity reset to 1]

## Cart Page

- TC-CART-01: [Navigate to /cart (logged in, empty cart)] - [Empty cart message "购物车是空的，快去挑选商品吧！" and "去购物" button]
- TC-CART-02: [Navigate to /cart (logged in, items in cart)] - [Cart table with items, quantity controls, subtotals, total price, "提交订单" button]
- TC-CART-03: [Click "+" on cart item] - [Quantity increases by 1, cart reloads]
- TC-CART-04: [Click "-" on cart item with qty > 1] - [Quantity decreases by 1, cart reloads]
- TC-CART-05: [Click "-" on cart item with qty = 1] - [Button disabled, nothing happens]
- TC-CART-06: [Click "删除" on cart item] - ["已从购物车中移除" message, item removed, cart reloads]
- TC-CART-07: [Click "提交订单"] - [Order created, redirect to /orders]
- TC-CART-08: [Click "去购物" on empty cart] - [Navigate to /products]

## OrderList Page

- TC-OL-01: [Navigate to /orders (logged in, no orders)] - ["暂无订单记录" and "去购物" button displayed]
- TC-OL-02: [Navigate to /orders (logged in, with orders)] - [Order cards displayed with ID, status, amount, time]
- TC-OL-03: [Click order card] - [Navigate to /order/:id]
- TC-OL-04: [Click "去购物" on empty orders] - [Navigate to /products]

## OrderDetail Page

- TC-OD-01: [Navigate to /order/:id] - [Order details displayed: ID, status, time, total amount, item list]
- TC-OD-02: [Click "← 返回订单列表" link] - [Navigate to /orders]

## Pagination Component

- TC-PAG-01: [Total items ≤ pageSize] - [Pagination not shown]
- TC-PAG-02: [Total items > pageSize] - [Pagination shown with page numbers, 上一页, 下一页]
- TC-PAG-03: [On first page, click "上一页"] - [Button disabled, nothing happens]
- TC-PAG-04: [On last page, click "下一页"] - [Button disabled, nothing happens]
- TC-PAG-05: [Click page number] - [page-change event emitted with correct page number]
