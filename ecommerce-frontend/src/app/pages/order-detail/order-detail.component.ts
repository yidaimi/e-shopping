import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';

/**
 * 订单详情页面组件
 * 展示订单基本信息和订单项列表
 */
@Component({
  selector: 'app-order-detail',
  template: `
    <div class="order-detail-container" *ngIf="order">
      <h2 class="page-title">订单详情</h2>

      <!-- 订单基本信息 -->
      <div class="order-info-card">
        <div class="info-row">
          <span class="info-label">订单编号</span>
          <span class="info-value">{{ order.id }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">订单状态</span>
          <span class="info-value order-status" [ngClass]="'status-' + order.status">{{ order.status }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">创建时间</span>
          <span class="info-value">{{ order.createdAt }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">订单总额</span>
          <span class="info-value total-amount">¥{{ order.totalAmount }}</span>
        </div>
      </div>

      <!-- 订单项列表 -->
      <div class="order-items-card">
        <h3 class="section-title">商品清单</h3>
        <table class="items-table">
          <thead>
            <tr>
              <th class="col-name">商品名称</th>
              <th class="col-price">单价</th>
              <th class="col-quantity">数量</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of order.items">
              <td class="col-name">{{ item.productName }}</td>
              <td class="col-price">¥{{ item.productPrice }}</td>
              <td class="col-quantity">{{ item.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 返回订单列表 -->
      <div class="back-link">
        <a routerLink="/orders">← 返回订单列表</a>
      </div>
    </div>
  `,
  styles: [`
    .order-detail-container {
      max-width: 800px;
      margin: 24px auto;
      padding: 0 16px;
    }
    .page-title {
      font-size: 22px;
      color: #333;
      margin-bottom: 20px;
    }
    .order-info-card {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 20px 24px;
      margin-bottom: 20px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #f5f5f5;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-size: 14px;
      color: #999;
    }
    .info-value {
      font-size: 14px;
      color: #333;
    }
    .order-status {
      padding: 2px 10px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 500;
    }
    .status-CREATED {
      color: #1890ff;
      background: #e6f7ff;
    }
    .status-PAID {
      color: #52c41a;
      background: #f6ffed;
    }
    .status-CANCELLED {
      color: #999;
      background: #f5f5f5;
    }
    .total-amount {
      font-size: 18px;
      color: #ff4d4f;
      font-weight: bold;
    }
    .order-items-card {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 16px;
      color: #333;
      padding: 16px 24px;
      margin: 0;
      border-bottom: 1px solid #eee;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
    }
    .items-table thead {
      background: #fafafa;
    }
    .items-table th {
      padding: 12px 24px;
      text-align: left;
      font-size: 14px;
      color: #666;
      font-weight: 500;
      border-bottom: 1px solid #eee;
    }
    .items-table td {
      padding: 14px 24px;
      font-size: 14px;
      color: #333;
      border-bottom: 1px solid #f0f0f0;
    }
    .items-table tr:last-child td {
      border-bottom: none;
    }
    .col-name {
      width: 50%;
    }
    .col-price {
      width: 25%;
    }
    .col-quantity {
      width: 25%;
    }
    .back-link {
      margin-top: 8px;
    }
    .back-link a {
      color: #1890ff;
      text-decoration: none;
      font-size: 14px;
    }
    .back-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class OrderDetailComponent implements OnInit {
  /** 订单详情数据，包含 id、totalAmount、status、createdAt、items */
  order: any = null;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 从路由参数获取订单ID并加载详情
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadOrder(+id);
    }
  }

  /**
   * 加载订单详情
   * 调用 OrderService.getOrderById() 获取订单完整信息
   * @param id 订单ID
   */
  loadOrder(id: number): void {
    this.orderService.getOrderById(id).subscribe({
      next: (res: any) => {
        if (res && res.data) {
          this.order = res.data;
        }
      },
      error: () => {
        this.order = null;
      }
    });
  }
}
