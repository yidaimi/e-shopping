# E-Shop 电商网站

基于 Spring Boot 2.7 + MyBatis + Angular 16 的全栈电商网站，采用 Maven 多模块架构。

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端框架 | Spring Boot 2.7.18 |
| ORM | MyBatis 3.5 |
| 数据库 | H2（内存模式，启动自动建表） |
| 认证 | JWT + BCrypt |
| 前端框架 | Angular 16 |
| 构建工具 | Maven 3.x + npm |

## 项目结构

```
ecommerce-website/
├── ecommerce-common/      # 公共模块：Result、异常类、JwtUtil
├── ecommerce-model/       # 数据模型：实体类、VO
├── ecommerce-mapper/      # 数据访问：MyBatis Mapper + XML
├── ecommerce-service/     # 业务逻辑：Service 接口和实现
├── ecommerce-web/         # Web 层：Controller、拦截器、启动类
├── ecommerce-frontend/    # 前端：Angular SPA
└── pom.xml                # 根 POM
```

## 环境要求

- Java 8+
- Maven 3.6+
- Node.js 16+（前端开发）
- npm 8+

## 快速启动

### 1. 编译后端

```bash
mvn clean install -DskipTests
```

### 2. 启动后端

```bash
mvn spring-boot:run -pl ecommerce-web
```

后端启动后访问：
- API 地址：http://localhost:8080
- H2 控制台：http://localhost:8080/h2-console（JDBC URL: `jdbc:h2:mem:ecommerce`，用户名: `sa`，密码为空）

### 3. 启动前端

```bash
cd ecommerce-frontend
npm install
ng serve --proxy-config proxy.conf.json
```

前端启动后访问：http://localhost:4200

## 测试账号

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 管理员 | admin | admin123 |
| 普通用户 | user | user123 |

也可以通过注册页面创建新账号。

## 功能说明

### 用户功能
- 注册、登录（JWT 认证）
- 商品浏览（分页、搜索、分类筛选）
- 商品详情查看
- 购物车管理（添加、修改数量、删除）
- 订单创建和查看

### 管理员功能
- 商品新增、修改、删除

### 商品分类
- 今日特惠、新品上市、热销排行、品牌精选

## API 接口

### 公开接口（无需认证）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/user/register | 用户注册 |
| POST | /api/user/login | 用户登录 |
| GET | /api/product/list | 商品列表（分页） |
| GET | /api/product/search | 商品搜索 |
| GET | /api/product/{id} | 商品详情 |
| GET | /api/product/tag/{tag} | 按标签查询商品 |

### 需认证接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/user/info | 当前用户信息 |
| GET | /api/cart | 查看购物车 |
| POST | /api/cart | 添加到购物车 |
| PUT | /api/cart/{id} | 修改购物车数量 |
| DELETE | /api/cart/{id} | 删除购物车商品 |
| POST | /api/order | 创建订单 |
| GET | /api/order/list | 订单列表 |
| GET | /api/order/{id} | 订单详情 |

### 管理员接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/admin/product | 新增商品 |
| PUT | /api/admin/product/{id} | 修改商品 |
| DELETE | /api/admin/product/{id} | 删除商品 |

## 打包部署

### 后端打包

```bash
mvn clean package -DskipTests
```

生成的可执行 JAR 在 `ecommerce-web/target/ecommerce-web-1.0.0-SNAPSHOT.jar`，运行：

```bash
java -jar ecommerce-web/target/ecommerce-web-1.0.0-SNAPSHOT.jar
```

### 前端打包

```bash
cd ecommerce-frontend
ng build --configuration production
```

生成的静态文件在 `ecommerce-frontend/dist/ecommerce-frontend/`，可部署到 Nginx 等 Web 服务器。

## .gitignore 建议

上传 Git 前建议添加以下忽略规则（见项目根目录 `.gitignore` 文件）。
