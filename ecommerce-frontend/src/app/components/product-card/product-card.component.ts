import { Component, Input } from '@angular/core';

/**
 * 商品卡片组件 - 仿 Amazon 风格
 */
@Component({
  selector: 'app-product-card',
  template: `
    <div class="card" [routerLink]="['/product', product.id]">
      <div class="card-img">
        <img [src]="product.imageUrl" [alt]="product.name"
             onerror="this.src='https://picsum.photos/seed/default/400/400'" />
      </div>
      <div class="card-body">
        <h3 class="card-title">{{ product.name }}</h3>
        <p class="card-desc">{{ product.description }}</p>
        <div class="card-rating">
          <span class="stars">★★★★☆</span>
          <span class="rating-count">{{ product.stock }} 件有货</span>
        </div>
        <div class="card-price">
          <span class="price-symbol">¥</span>
          <span class="price-whole">{{ getWhole(product.price) }}</span>
          <span class="price-decimal">.{{ getDecimal(product.price) }}</span>
        </div>
        <div class="card-delivery">免费配送</div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: #fff;
      border-radius: 4px;
      cursor: pointer;
      padding: 16px;
      transition: box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .card:hover {
      box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    }
    .card-img {
      width: 100%;
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
    }
    .card-img img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 4px;
    }
    .card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .card-title {
      font-size: 14px;
      color: #0F1111;
      font-weight: 400;
      line-height: 1.4;
      margin-bottom: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .card-title:hover {
      color: #C7511F;
    }
    .card-desc {
      font-size: 12px;
      color: #565959;
      margin-bottom: 6px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .card-rating {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
    }
    .stars { color: #DE7921; font-size: 14px; }
    .rating-count { font-size: 12px; color: #007185; }
    .card-price {
      display: flex;
      align-items: flex-start;
      margin-bottom: 4px;
    }
    .price-symbol { font-size: 13px; margin-top: 2px; }
    .price-whole { font-size: 28px; font-weight: 400; line-height: 1; }
    .price-decimal { font-size: 13px; margin-top: 2px; }
    .card-delivery {
      font-size: 12px;
      color: #565959;
      margin-top: auto;
    }
  `]
})
export class ProductCardComponent {
  @Input() product: any;

  getWhole(price: number): string {
    return Math.floor(price).toLocaleString();
  }

  getDecimal(price: number): string {
    return (price % 1).toFixed(2).substring(2);
  }
}
