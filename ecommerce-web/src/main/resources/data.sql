-- ============================================
-- 电商网站测试数据初始化脚本
-- ============================================

-- 插入管理员账号（密码: admin123）
INSERT INTO sys_user (username, password, email, role) VALUES
('admin', '$2a$10$ZY46FV8As9AKKwqWKnF3.ejKGgDg7GAf6/c5q4l0Vwocm9orbHiTm', 'admin@example.com', 'ADMIN');

-- 插入普通用户账号（密码: user123）
INSERT INTO sys_user (username, password, email, role) VALUES
('user', '$2a$10$tBEfaGft95kYVU/Km/91MeHeMFjDU1wBOvM3pDjW/5xY2fHqZuaqu', 'user@example.com', 'USER');

-- 今日特惠商品（tag = TODAY_DEAL）
INSERT INTO product (name, description, price, stock, image_url, tag) VALUES
('iPhone 5s 收藏版', '苹果经典手机，首款搭载 Touch ID 指纹识别，A7 芯片，紧凑精致设计', 899.00, 150, 'https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp', 'TODAY_DEAL');

INSERT INTO product (name, description, price, stock, image_url, tag) VALUES
('iPhone 6 经典版', '苹果经典手机，4.7 英寸 Retina 显示屏，A8 芯片，经典圆润设计', 1299.00, 200, 'https://cdn.dummyjson.com/product-images/smartphones/iphone-6/thumbnail.webp', 'TODAY_DEAL');

INSERT INTO product (name, description, price, stock, image_url, tag) VALUES
('Samsung Galaxy Tab 白色', '三星平板电脑，轻薄便携，高清显示屏，长续航电池，适合日常娱乐和办公', 2499.00, 110, 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/thumbnail.webp', 'TODAY_DEAL');

-- 新品上市（tag = NEW）
INSERT INTO product (name, description, price, stock, image_url, tag) VALUES
('iPhone 13 Pro', '苹果旗舰手机，A15 仿生芯片，ProMotion 自适应刷新率显示屏，专业级三摄系统', 7999.00, 100, 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp', 'NEW');

INSERT INTO product (name, description, price, stock, image_url, tag) VALUES
('Samsung Galaxy S10', '三星旗舰手机，Dynamic AMOLED 显示屏，超声波屏下指纹，三摄系统', 4999.00, 120, 'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp', 'NEW');

INSERT INTO product (name, description, price, stock, image_url, tag) VALUES
('Apple AirPods Max 银色', '苹果头戴式降噪耳机，高保真音频，自适应 EQ，主动降噪，沉浸式空间音频', 4399.00, 90, 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp', 'NEW');

-- 热销排行（tag = HOT）
INSERT INTO product (name, description, price, stock, image_url, tag) VALUES
('Apple AirPods', '苹果无线耳机，无缝连接 Apple 设备，高品质音频，Siri 语音控制', 1299.00, 300, 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/thumbnail.webp', 'HOT');

INSERT INTO product (name, description, price, stock, image_url, tag) VALUES
('iPad Mini 2021 星光色', '苹果迷你平板电脑，A15 仿生芯片，8.3 英寸 Liquid Retina 显示屏', 3799.00, 80, 'https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/thumbnail.webp', 'HOT');

INSERT INTO product (name, description, price, stock, image_url, tag) VALUES
('Amazon Echo Plus 智能音箱', '亚马逊智能音箱，内置 Alexa 语音助手，高品质音效，智能家居控制中心', 799.00, 180, 'https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/thumbnail.webp', 'HOT');

-- 品牌精选（tag = BRAND）
INSERT INTO product (name, description, price, stock, image_url, tag) VALUES
('MacBook Pro 14 英寸', '苹果专业笔记本电脑，M1 Pro 芯片，Liquid Retina XDR 显示屏，深空灰', 14999.00, 50, 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp', 'BRAND');

INSERT INTO product (name, description, price, stock, image_url, tag) VALUES
('华为 MateBook X Pro', '华为轻薄笔记本电脑，高分辨率触控屏，全面屏设计，商务办公首选', 9499.00, 75, 'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp', 'BRAND');

INSERT INTO product (name, description, price, stock, image_url, tag) VALUES
('Samsung Galaxy Tab S8+', '三星高端平板电脑，12.4 英寸 Super AMOLED 显示屏，支持 S Pen', 5999.00, 60, 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/thumbnail.webp', 'BRAND');
