# UI Behavior Test Cases — E-Shop E-Commerce Platform

## Header Navigation (AppHeader.vue)

TC-HDR-01: [Click E-Shop logo] - [Navigate to /products]
TC-HDR-02: [Type "手机" in search and press Enter] - [Navigate to /products?keyword=手机]
TC-HDR-03: [Type "手机" in search and click 🔍 button] - [Navigate to /products?keyword=手机]
TC-HDR-04: [Clear search input and press Enter] - [Navigate to /products without keyword]
TC-HDR-05: [Click "全部商品" in sub-nav] - [Navigate to /products]
TC-HDR-06: [Click "今日特惠" in sub-nav] - [Navigate to /products?tag=TODAY_DEAL]
TC-HDR-07: [Click "新品上市" in sub-nav] - [Navigate to /products?tag=NEW]
TC-HDR-08: [Click "热销排行" in sub-nav] - [Navigate to /products?tag=HOT]
TC-HDR-09: [Click "品牌精选" in sub-nav] - [Navigate to /products?tag=BRAND]
TC-HDR-10: [Click "购物车" when not logged in] - [Navigate to /login (auth guard)]
TC-HDR-11: [When not logged in, verify "你好，请登录" and "新用户？免费注册" links visible] - [Links to /login and /register displayed]
TC-HDR-12: [When logged in, verify "我的 订单" and "退出登录" links visible] - [Links to /orders and logout displayed]
TC-HDR-13: [Click "退出登录" when logged in] - [Token removed, navigate to /login]

## Login Page (Login.vue)

TC-LOGIN-01: [Navigate to /login] - [Login form displayed with username, password fields and "登录" button]
TC-LOGIN-02: [Enter valid credentials and click "登录"] - [Navigate to /products after successful login]
TC-LOGIN-03: [Enter invalid credentials and click "登录"] - [Error message displayed in red area]
TC-LOGIN-04: [Click "去注册" link] - [Navigate to /register]
TC-LOGIN-05: [Verify page title "用户登录" is displayed] - [Title visible]

## Register Page (Register.vue)

TC-REG-01: [Navigate to /register] - [Registration form displayed with username, password, email fields and "注册" button]
TC-REG-02: [Enter valid data and click "注册"] - [Success message "注册成功，即将跳转到登录页..." displayed, then redirect to /login after 1.5s]
TC-REG-03: [Enter invalid/duplicate data and click "注册"] - [Error message displayed in red area]
TC-REG-04: [Click "去登录" link] - [Navigate to /login]
TC-REG-05: [Verify page title "用户注册" is displayed] - [Title visible]

## Product List Page (ProductList.vue)

TC-PL-01: [Navigate to /products] - [Hero banner visible, section title "为你推荐" visible, product grid displayed]
TC-PL-02: [Navigate to /products?keyword=手机] - [Search hint "搜索 '手机' 的结果 共 N 件商品" visible, hero banner hidden]
TC-PL-03: [Navigate to /products?tag=TODAY_DEAL] - [Tag hint "🔥 今日特惠 共 N 件商品" visible, hero banner hidden]
TC-PL-04: [Click on a product card] - [Navigate to /product/{id}]
TC-PL-05: [When no products match] - [Empty state with 📦 icon and "暂无商品数据" visible]
TC-PL-06: [When loading] - [Loading text "加载中..." visible]
TC-PL-07: [When total > 12, verify pagination visible] - [Pagination component with page buttons displayed]
TC-PL-08: [Click page 2 in pagination] - [Products reload with page=1, window scrolls to top]

## Product Detail Page (ProductDetail.vue)

TC-PD-01: [Navigate to /product/1] - [Product name, description, price, stock, quantity input, "加入购物车" button visible]
TC-PD-02: [Set quantity to 0 and blur] - [Quantity corrected to 1]
TC-PD-03: [Click "加入购物车" when not logged in] - [Navigate to /login]
TC-PD-04: [Click "加入购物车" when logged in] - [Success message "已加入购物车" displayed]
TC-PD-05: [Verify stock <= 5 shows red highlight] - [Stock number has class "low-stock"]
TC-PD-06: [Verify price is displayed with ¥ symbol] - [Price shows "¥{price}"]

## Cart Page (Cart.vue)

TC-CART-01: [Navigate to /cart when not logged in] - [Redirect to /login]
TC-CART-02: [Navigate to /cart when logged in with empty cart] - [Empty message "购物车是空的，快去挑选商品吧！" and "去购物" button visible]
TC-CART-03: [Click "去购物" button on empty cart] - [Navigate to /products]
TC-CART-04: [Navigate to /cart when logged in with items] - [Cart table with items, total price, "提交订单" button visible]
TC-CART-05: [Click "+" button on cart item] - [Quantity increases by 1, cart reloads]
TC-CART-06: [Click "-" button on cart item with quantity > 1] - [Quantity decreases by 1, cart reloads]
TC-CART-07: [Click "-" button on cart item with quantity = 1] - [Button disabled, nothing happens]
TC-CART-08: [Click "删除" on cart item] - [Item removed, success message "已从购物车中移除", cart reloads]
TC-CART-09: [Click "提交订单"] - [Navigate to /orders on success]
TC-CART-10: [Verify table headers: 商品, 单价, 数量, 小计, 操作] - [Headers visible]
TC-CART-11: [Verify "合计" with total price shown in red] - [Total displayed]

## Order List Page (OrderList.vue)

TC-OL-01: [Navigate to /orders when not logged in] - [Redirect to /login]
TC-OL-02: [Navigate to /orders when logged in with no orders] - [Empty message "暂无订单记录" and "去购物" button visible]
TC-OL-03: [Navigate to /orders when logged in with orders] - [Order cards with 订单编号, status badge, amount, time visible]
TC-OL-04: [Click on an order card] - [Navigate to /order/{orderId}]
TC-OL-05: [Verify order status badges have correct colors] - [CREATED=blue, PAID=green, CANCELLED=gray]

## Order Detail Page (OrderDetail.vue)

TC-OD-01: [Navigate to /order/1 when not logged in] - [Redirect to /login]
TC-OD-02: [Navigate to /order/1 when logged in] - [Order info with 订单编号, 订单状态, 创建时间, 订单总额 visible]
TC-OD-03: [Verify 商品清单 table with 商品名称, 单价, 数量 columns] - [Table visible with items]
TC-OD-04: [Click "← 返回订单列表" link] - [Navigate to /orders]
