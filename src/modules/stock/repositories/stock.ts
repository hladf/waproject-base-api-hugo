import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IStock } from 'modules/database/interfaces/stock';
import { Stock } from 'modules/database/models/stock';
import { Page, Transaction } from 'objection';

@Injectable()
export class StockRepository {
  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Stock>> {
    let query = Stock.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      query = query.orderBy(params.orderBy, params.orderDirection);
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('name', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }

  public async count(transaction?: Transaction): Promise<Number> {
    const result: any = await Stock.query(transaction)
      .count('id as count')
      .first();

    return Number(result.count);
  }

  public async findById(id: number, transaction?: Transaction): Promise<Stock> {
    return Stock.query(transaction)
      .where({ id })
      .first();
  }

  public async insert(model: IStock, transaction?: Transaction): Promise<Stock> {
    return Stock.query(transaction).insert(model);
  }

  public async update(model: IStock, transaction?: Transaction): Promise<Stock> {
    return Stock.query(transaction).updateAndFetchById(model.id, <Stock>model);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await Stock.query(transaction)
      .del()
      .where({ id });
  }
}
