import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

/**
 * 商品列表页面组件 - 仿 Amazon 首页风格
 */
@Component({
  selector: 'app-product-list',
  template: `
    <div class="home-container">
      <!-- 顶部 Banner 轮播区 -->
      <div class="hero-banner" *ngIf="!keyword && !tag">
        <div class="hero-content">
          <h1>欢迎来到 E-Shop</h1>
          <p>发现海量好物，享受极致购物体验</p>
        </div>
        <div class="hero-overlay"></div>
      </div>

      <!-- 搜索结果提示 -->
      <div class="search-result-hint" *ngIf="keyword">
        <span>搜索 "<strong>{{ keyword }}</strong>" 的结果</span>
        <span class="result-count">共 {{ total }} 件商品</span>
      </div>

      <!-- 标签筛选提示 -->
      <div class="search-result-hint" *ngIf="tag && !keyword">
        <span>{{ tagLabel }}</span>
        <span class="result-count">共 {{ total }} 件商品</span>
      </div>

      <!-- 商品网格 -->
      <div class="section" *ngIf="products.length > 0">
        <h2 class="section-title" *ngIf="!keyword && !tag">为你推荐</h2>
        <div class="product-grid">
          <app-product-card
            *ngFor="let product of products"
            [product]="product">
          </app-product-card>
        </div>
      </div>

      <!-- 空状态 -->
      <div class="empty-state" *ngIf="products.length === 0 && !loading">
        <div class="empty-icon">📦</div>
        <p>暂无商品数据</p>
      </div>

      <!-- 加载中 -->
      <div class="loading-state" *ngIf="loading">
        <p>加载中...</p>
      </div>

      <!-- 分页 -->
      <app-pagination
        *ngIf="total > pageSize"
        [currentPage]="currentPage"
        [total]="total"
        [pageSize]="pageSize"
        (pageChange)="onPageChange($event)">
      </app-pagination>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1500px;
      margin: 0 auto;
      padding: 0 16px 40px;
    }

    /* Banner 区域 */
    .hero-banner {
      position: relative;
      height: 300px;
      background: linear-gradient(135deg, #232F3E 0%, #37475A 50%, #485769 100%);
      border-radius: 0 0 4px 4px;
      margin: 0 -16px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .hero-content {
      text-align: center;
      color: #fff;
      z-index: 2;
      padding: 20px;
    }
    .hero-content h1 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 12px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    .hero-content p {
      font-size: 18px;
      color: rgba(255,255,255,0.85);
    }
    .hero-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: url('https://picsum.photos/seed/banner/1500/300') center/cover;
      opacity: 0.2;
    }

    /* 搜索结果提示 */
    .search-result-hint {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 0;
      font-size: 16px;
      color: #0F1111;
      border-bottom: 1px solid #DDD;
      margin-bottom: 20px;
    }
    .search-result-hint strong { color: #C7511F; }
    .result-count { color: #565959; font-size: 14px; }

    /* 商品区域 */
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 21px;
      font-weight: 700;
      color: #0F1111;
      padding: 16px 0 12px;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 20px;
    }

    /* 空状态 */
    .empty-state {
      text-align: center;
      padding: 80px 0;
      color: #565959;
    }
    .empty-icon { font-size: 64px; margin-bottom: 16px; }
    .empty-state p { font-size: 18px; }

    .loading-state {
      text-align: center;
      padding: 40px;
      color: #565959;
      font-size: 16px;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  currentPage = 0;
  pageSize = 12;
  total = 0;
  keyword = '';
  tag = '';
  tagLabel = '';
  loading = false;

  private tagLabels: { [key: string]: string } = {
    'TODAY_DEAL': '🔥 今日特惠',
    'NEW': '✨ 新品上市',
    'HOT': '🏆 热销排行',
    'BRAND': '💎 品牌精选'
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 监听路由查询参数变化（从 Header 搜索栏传入）
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'] || '';
      this.tag = params['tag'] || '';
      this.tagLabel = this.tagLabels[this.tag] || '';
      this.currentPage = 0;
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.loading = true;
    let request$;
    if (this.keyword.trim()) {
      request$ = this.productService.searchProducts(this.keyword.trim(), this.currentPage, this.pageSize);
    } else if (this.tag) {
      request$ = this.productService.listByTag(this.tag, this.currentPage, this.pageSize);
    } else {
      request$ = this.productService.listProducts(this.currentPage, this.pageSize);
    }

    request$.subscribe({
      next: (res: any) => {
        if (res && res.data) {
          this.products = res.data.list || [];
          this.total = res.data.total || 0;
        }
        this.loading = false;
      },
      error: () => {
        this.products = [];
        this.total = 0;
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
