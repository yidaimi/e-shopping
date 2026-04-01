import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

/**
 * 认证路由守卫
 * 保护需要登录才能访问的页面（购物车、订单等）
 * 未登录用户将被重定向到登录页面
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    // 检查 localStorage 中是否存在 token
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    // 未登录，重定向到登录页面
    return this.router.createUrlTree(['/login']);
  }
}
