import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * 分页组件
 * 根据总数、每页大小和当前页码，渲染页码按钮
 * 支持上一页、下一页和直接跳转到指定页
 */
@Component({
  selector: 'app-pagination',
  template: `
    <div class="pagination" *ngIf="totalPages > 1">
      <!-- 上一页按钮 -->
      <button
        class="page-btn"
        [disabled]="currentPage <= 0"
        (click)="goToPage(currentPage - 1)">
        上一页
      </button>

      <!-- 页码按钮 -->
      <button
        *ngFor="let p of pages"
        class="page-btn"
        [class.active]="p === currentPage"
        (click)="goToPage(p)">
        {{ p + 1 }}
      </button>

      <!-- 下一页按钮 -->
      <button
        class="page-btn"
        [disabled]="currentPage >= totalPages - 1"
        (click)="goToPage(currentPage + 1)">
        下一页
      </button>
    </div>
  `,
  styles: [`
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-top: 24px;
      padding: 16px 0;
    }
    .page-btn {
      padding: 6px 14px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      background: #fff;
      color: #333;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    .page-btn:hover:not(:disabled):not(.active) {
      color: #1890ff;
      border-color: #1890ff;
    }
    .page-btn.active {
      background: #1890ff;
      color: #fff;
      border-color: #1890ff;
    }
    .page-btn:disabled {
      color: #ccc;
      cursor: not-allowed;
      border-color: #e8e8e8;
    }
  `]
})
export class PaginationComponent {
  /** 当前页码（从0开始） */
  @Input() currentPage: number = 0;
  /** 数据总数 */
  @Input() total: number = 0;
  /** 每页大小 */
  @Input() pageSize: number = 10;
  /** 页码变更事件 */
  @Output() pageChange = new EventEmitter<number>();

  /**
   * 计算总页数
   */
  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  /**
   * 生成页码数组，用于模板渲染
   */
  get pages(): number[] {
    const arr: number[] = [];
    for (let i = 0; i < this.totalPages; i++) {
      arr.push(i);
    }
    return arr;
  }

  /**
   * 跳转到指定页
   * @param page 目标页码
   */
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
