import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

/**
 * 注册页面组件
 * 提供用户名、密码、邮箱输入表单，调用 UserService 完成注册
 * 注册成功后跳转到登录页
 */
@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <h2>用户注册</h2>

      <!-- 错误提示 -->
      <div class="error-message" *ngIf="errorMessage">{{ errorMessage }}</div>

      <!-- 成功提示 -->
      <div class="success-message" *ngIf="successMessage">{{ successMessage }}</div>

      <!-- 注册表单 -->
      <div class="form-group">
        <label>用户名</label>
        <input type="text" [(ngModel)]="username" placeholder="请输入用户名" />
      </div>

      <div class="form-group">
        <label>密码</label>
        <input type="password" [(ngModel)]="password" placeholder="请输入密码" />
      </div>

      <div class="form-group">
        <label>邮箱</label>
        <input type="email" [(ngModel)]="email" placeholder="请输入邮箱" />
      </div>

      <button class="btn-register" (click)="onRegister()">注册</button>

      <p class="link-text">
        已有账号？<a routerLink="/login">去登录</a>
      </p>
    </div>
  `,
  styles: [`
    .register-container {
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
    .btn-register {
      width: 100%;
      padding: 12px;
      background: #52c41a;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 8px;
    }
    .btn-register:hover {
      background: #73d13d;
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
    .success-message {
      color: #52c41a;
      background: #f6ffed;
      border: 1px solid #b7eb8f;
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
export class RegisterComponent {
  /** 用户名 */
  username = '';
  /** 密码 */
  password = '';
  /** 邮箱 */
  email = '';
  /** 错误提示信息 */
  errorMessage = '';
  /** 成功提示信息 */
  successMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * 注册操作
   * 调用 UserService.register，成功后跳转到登录页，失败则显示错误信息
   */
  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.userService.register(this.username, this.password, this.email).subscribe({
      next: () => {
        // 注册成功，跳转到登录页
        this.successMessage = '注册成功，即将跳转到登录页...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        // 注册失败，显示错误信息
        this.errorMessage = err.error?.message || '注册失败，请稍后重试';
      }
    });
  }
}
