import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { StockController } from './controllers/stock';
import { DefaultMiddleware } from './middlewares/defaultMiddleware';
import { StockRepository } from './repositories/stock';
import { StockService } from './services/stock';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [StockController],
  providers: [StockRepository, StockService]
})
export class StockModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(DefaultMiddleware).forRoutes('*');
  }
}
