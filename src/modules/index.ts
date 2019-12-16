import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';

import { AdminModule } from './admin/module';
import { AppModule } from './app/module';
import { StockModule } from './stock/module';

@Module({
  imports: [
    RouterModule.forRoutes([
      { path: '/admin', module: AdminModule },
      { path: '/app', module: AppModule },
      { path: '/stock', module: StockModule }
    ]),
    AdminModule,
    AppModule,
    StockModule
  ]
})
export class ApplicationModule {}
