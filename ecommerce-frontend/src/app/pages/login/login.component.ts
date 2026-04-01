import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

/**
 * 登录页面组件
 * 提供用户名和密码输入表单，调用 UserService 完成登录
 * 登录成功后跳转到商品列表页
 */
@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>用户登录</h2>

      <!-- 错误提示 -->
      <div class="error-message" *ngIf="errorMessage">{{ errorMessage }}</div>

      <!-- 登录表单 -->
      <div class="form-group">
        <label>用户名</label>
        <input type="text" [(ngModel)]="username" placeholder="请输入用户名" />
      </div>

      <div class="form-group">
        <label>密码</label>
        <input type="password" [(ngModel)]="password" placeholder="请输入密码" />
      </div>

      <button class="btn-login" (click)="onLogin()">登录</button>

      <p class="link-text">
        没有账号？<a routerLink="/register">去注册</a>
      </p>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 80px auto;
      padding: 32px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #fff;
    }
    h2 {
      text-align: center;
      margin-bottom: 24px;
      color: #333;
    }
    .form-group {
      margin-bottom: 16px;
    }
    .form-group label {
      display: block;
      margin-bottom: 6px;
      font-size: 14px;
      color: #555;
    }
    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }
    .btn-login {
      width: 100%;
      padding: 12px;
      background: #1890ff;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 8px;
    }
    .btn-login:hover {
      background: #40a9ff;
    }
    .error-message {
      color: #ff4d4f;
      background: #fff2f0;
      border: 1px solid #ffccc7;
      padding: 8px 12px;
      border-radius: 4px;
      margin-bottom: 16px;
      font-size: 14px;
    }
    .link-text {
      text-align: center;
      margin-top: 16px;
      font-size: 14px;
      color: #666;
    }
    .link-text a {
      color: #1890ff;
      text-decoration: none;
    }
  `]
})
export class LoginComponent {
  /** 用户名 */
  username = '';
  /** 密码 */
  password = '';
  /** 错误提示信息 */
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * 登录操作
   * 调用 UserService.login，成功后跳转到商品列表页，失败则显示错误信息
   */
  onLogin(): void {
    this.errorMessage = '';
    this.userService.login(this.username, this.password).subscribe({
      next: () => {
        // 登录成功，跳转到商品列表页
        this.router.navigate(['/products']);
      },
      error: (err) => {
        // 登录失败，显示错误信息
        this.errorMessage = err.error?.message || '登录失败，请检查用户名和密码';
      }
    });
  }
}
