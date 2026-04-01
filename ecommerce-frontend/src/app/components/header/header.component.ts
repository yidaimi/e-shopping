import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

/**
 * 顶部导航组件 - 仿 Amazon 风格
 */
@Component({
  selector: 'app-header',
  template: `
    <!-- 主导航栏 -->
    <nav class="nav-main">
      <a class="nav-logo" routerLink="/products">
        <span class="logo-icon">🛒</span>
        <span class="logo-text">E-Shop</span>
      </a>

      <!-- 搜索栏 -->
      <div class="nav-search">
        <input
          type="text"
          [(ngModel)]="searchKeyword"
          placeholder="搜索商品..."
          (keyup.enter)="onSearch()" />
        <button class="search-btn" (click)="onSearch()">🔍</button>
      </div>

      <!-- 右侧功能区 -->
      <div class="nav-actions">
        <ng-container *ngIf="isLoggedIn(); else notLoggedIn">
          <a class="nav-action-item" routerLink="/orders">
            <span class="action-line1">我的</span>
            <span class="action-line2">订单</span>
          </a>
          <a class="nav-action-item" (click)="logout()" style="cursor:pointer">
            <span class="action-line1">你好</span>
            <span class="action-line2">退出登录</span>
          </a>
        </ng-container>
        <ng-template #notLoggedIn>
          <a class="nav-action-item" routerLink="/login">
            <span class="action-line1">你好，请登录</span>
            <span class="action-line2">账户管理</span>
          </a>
          <a class="nav-action-item" routerLink="/register">
            <span class="action-line1">新用户？</span>
            <span class="action-line2">免费注册</span>
          </a>
        </ng-template>
        <a class="nav-cart" routerLink="/cart">
          <span class="cart-icon">🛒</span>
          <span class="cart-text">购物车</span>
        </a>
      </div>
    </nav>

    <!-- 子导航栏 -->
    <div class="nav-sub">
      <a routerLink="/products">全部商品</a>
      <a routerLink="/products" [queryParams]="{tag: 'TODAY_DEAL'}">今日特惠</a>
      <a routerLink="/products" [queryParams]="{tag: 'NEW'}">新品上市</a>
      <a routerLink="/products" [queryParams]="{tag: 'HOT'}">热销排行</a>
      <a routerLink="/products" [queryParams]="{tag: 'BRAND'}">品牌精选</a>
    </div>
  `,
  styles: [`
    .nav-main {
      display: flex;
      align-items: center;
      padding: 0 16px;
      height: 60px;
      background: #131921;
      color: #fff;
      gap: 12px;
    }
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 4px;
      text-decoration: none;
      color: #fff;
      padding: 8px;
      border: 1px solid transparent;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .nav-logo:hover {
      border-color: #fff;
      text-decoration: none;
      color: #fff;
    }
    .logo-icon { font-size: 24px; }
    .logo-text { font-size: 22px; font-weight: bold; letter-spacing: 1px; }

    .nav-search {
      flex: 1;
      display: flex;
      height: 40px;
      border-radius: 4px;
      overflow: hidden;
    }
    .nav-search input {
      flex: 1;
      border: none;
      padding: 0 14px;
      font-size: 15px;
      outline: none;
      color: #111;
    }
    .search-btn {
      width: 48px;
      background: #FEBD69;
      border: none;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .search-btn:hover { background: #F3A847; }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }
    .nav-action-item {
      display: flex;
      flex-direction: column;
      padding: 8px 10px;
      border: 1px solid transparent;
      border-radius: 3px;
      text-decoration: none;
      color: #fff;
      line-height: 1.2;
    }
    .nav-action-item:hover {
      border-color: #fff;
      text-decoration: none;
      color: #fff;
    }
    .action-line1 { font-size: 12px; color: #ccc; }
    .action-line2 { font-size: 14px; font-weight: bold; }

    .nav-cart {
      display: flex;
      align-items: flex-end;
      gap: 4px;
      padding: 8px 10px;
      border: 1px solid transparent;
      border-radius: 3px;
      text-decoration: none;
      color: #fff;
    }
    .nav-cart:hover {
      border-color: #fff;
      text-decoration: none;
      color: #fff;
    }
    .cart-icon { font-size: 28px; }
    .cart-text { font-size: 14px; font-weight: bold; margin-bottom: 2px; }

    .nav-sub {
      display: flex;
      align-items: center;
      padding: 0 16px;
      height: 38px;
      background: #232F3E;
      gap: 4px;
      overflow-x: auto;
    }
    .nav-sub a {
      color: #fff;
      font-size: 14px;
      padding: 6px 12px;
      border: 1px solid transparent;
      border-radius: 3px;
      white-space: nowrap;
      text-decoration: none;
    }
    .nav-sub a:hover {
      border-color: #fff;
      text-decoration: none;
      color: #fff;
    }
  `]
})
export class HeaderComponent {
  searchKeyword = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  onSearch(): void {
    if (this.searchKeyword.trim()) {
      this.router.navigate(['/products'], { queryParams: { keyword: this.searchKeyword.trim() } });
    } else {
      this.router.navigate(['/products']);
    }
  }
}
