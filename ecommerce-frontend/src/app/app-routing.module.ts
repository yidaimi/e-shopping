import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 页面组件导入
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';

// 路由守卫
import { AuthGuard } from './guards/auth.guard';

/**
 * 应用路由配置
 * 定义所有页面的路由映射关系
 */
const routes: Routes = [
  // 默认重定向到商品列表页
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  // 用户认证页面（无需登录）
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // 商品页面（无需登录）
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  // 购物车页面（需要登录）
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  // 订单页面（需要登录）
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'order/:id', component: OrderDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
