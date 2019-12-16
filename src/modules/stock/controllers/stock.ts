import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { enRoles } from 'modules/database/interfaces/user';
import { AuthRequired } from 'modules/common/guards/token';
import { Stock } from 'modules/database/models/stock';

import { StockRepository } from '../repositories/stock';
import { StockService } from '../services/stock';
import { ListValidator } from '../validators/stocks/list';
import { SaveValidator } from '../validators/stocks/save';

@ApiTags('Stock: Stock')
@Controller('/product')
@AuthRequired([enRoles.user])
export class StockController {
  constructor(private stockRepository: StockRepository, private stockService: StockService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Stock] })
  public async list(@Query() model: ListValidator) {
    return this.stockRepository.list(model);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Stock })
  public async details(@Param('id', ParseIntPipe) id: number) {
    return this.stockRepository.findById(id);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.remove(id);
  }

  @Post('save')
  @ApiResponse({ status: 200, type: Stock })
  public async save(@Body() model: SaveValidator) {
    return this.stockService.save(model);
  }
}
