import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * 商品服务
 * 封装商品列表查询、搜索、详情等 API 调用
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  /**
   * 分页查询商品列表
   * @param page 页码，从0开始
   * @param size 每页大小
   * @returns 包含分页结果的响应
   */
  listProducts(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get('/api/product/list', { params });
  }

  /**
   * 按关键词搜索商品
   * @param keyword 搜索关键词
   * @param page 页码，从0开始
   * @param size 每页大小
   * @returns 包含分页结果的响应
   */
  searchProducts(keyword: string, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get('/api/product/search', { params });
  }

  /**
   * 查询商品详情
   * @param id 商品ID
   * @returns 包含商品信息的响应
   */
  getProductById(id: number): Observable<any> {
    return this.http.get(`/api/product/${id}`);
  }

  /**
   * 按标签分页查询商品
   */
  listByTag(tag: string, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(`/api/product/tag/${tag}`, { params });
  }
}
