import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * 购物车服务
 * 封装购物车查询、添加、修改数量、删除等 API 调用
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  /**
   * 查询当前用户购物车
   * @returns 包含购物车内容的响应
   */
  getCart(): Observable<any> {
    return this.http.get('/api/cart');
  }

  /**
   * 添加商品到购物车
   * @param productId 商品ID
   * @param quantity 数量
   * @returns 操作结果
   */
  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post('/api/cart', { productId, quantity });
  }

  /**
   * 修改购物车商品数量
   * @param cartItemId 购物车项ID
   * @param quantity 新数量
   * @returns 操作结果
   */
  updateQuantity(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`/api/cart/${cartItemId}`, { quantity });
  }

  /**
   * 删除购物车中的商品
   * @param cartItemId 购物车项ID
   * @returns 操作结果
   */
  removeCartItem(cartItemId: number): Observable<any> {
    return this.http.delete(`/api/cart/${cartItemId}`);
  }
}
