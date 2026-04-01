import { Component } from '@angular/core';

/**
 * 根组件
 * 包含顶部导航和路由出口
 */
@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = '电商网站';
}
