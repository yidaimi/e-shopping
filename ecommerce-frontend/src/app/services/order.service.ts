import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * 订单服务
 * 封装订单创建、列表查询、详情查询等 API 调用
 */
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  /**
   * 创建订单
   * 根据当前用户购物车内容创建订单
   * @returns 包含新订单ID的响应
   */
  createOrder(): Observable<any> {
    return this.http.post('/api/order', {});
  }

  /**
   * 查询当前用户订单列表
   * @returns 包含订单列表的响应
   */
  listOrders(): Observable<any> {
    return this.http.get('/api/order/list');
  }

  /**
   * 查询订单详情
   * @param id 订单ID
   * @returns 包含订单详情的响应
   */
  getOrderById(id: number): Observable<any> {
    return this.http.get(`/api/order/${id}`);
  }
}
