import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// 引导启动 Angular 应用
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
