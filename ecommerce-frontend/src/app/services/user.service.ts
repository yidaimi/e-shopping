import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

/**
 * 用户服务
 * 封装用户注册、登录、获取用户信息等 API 调用
 * 管理 JWT token 的存储和读取
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** token 在 localStorage 中的存储键名 */
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  /**
   * 用户注册
   * @param username 用户名
   * @param password 密码
   * @param email 邮箱
   * @returns 包含用户ID的响应
   */
  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post('/api/user/register', { username, password, email });
  }

  /**
   * 用户登录
   * 登录成功后自动将 token 保存到 localStorage
   * @param username 用户名
   * @param password 密码
   * @returns 包含 JWT token 的响应
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/user/login', { username, password }).pipe(
      tap((res: any) => {
        // 登录成功后将 token 保存到 localStorage
        if (res && res.data) {
          localStorage.setItem(this.TOKEN_KEY, res.data);
        }
      })
    );
  }

  /**
   * 获取当前登录用户信息
   * @returns 包含用户信息的响应
   */
  getUserInfo(): Observable<any> {
    return this.http.get('/api/user/info');
  }

  /**
   * 从 localStorage 获取 token
   * @returns token 字符串，不存在则返回 null
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * 检查用户是否已登录
   * @returns 是否存在有效 token
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * 退出登录
   * 清除 localStorage 中的 token
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
