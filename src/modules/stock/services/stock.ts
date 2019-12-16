import { Injectable, NotFoundException } from '@nestjs/common';
import { Stock } from 'modules/database/models/stock';

import { StockRepository } from '../repositories/stock';
import { IStock } from 'modules/database/interfaces/stock';

@Injectable()
export class StockService {
  constructor(private stockRepository: StockRepository) {}

  public async save(model: IStock): Promise<Stock> {
    if (model.id) return this.update(model);

    return this.create(model);
  }

  public async remove(id: number): Promise<void> {
    const product = await this.stockRepository.findById(id);

    if (!product) {
      throw new NotFoundException('not-found');
    }

    return this.stockRepository.remove(id);
  }

  private async create(model: IStock): Promise<Stock> {
    const product = await this.stockRepository.insert(model);

    return product;
  }

  private async update(model: IStock): Promise<Stock> {
    const product = await this.stockRepository.findById(model.id);

    if (!product) throw new NotFoundException('not-found');

    return this.stockRepository.update({ ...product, ...model });
  }
}
