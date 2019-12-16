import { NotFoundException } from '@nestjs/common';
import { IStock } from 'modules/database/interfaces/stock';

import { StockRepository } from '../repositories/stock';
import { StockService } from './stock';

/* eslint-disable max-len */
describe('Stock/StockService', () => {
  let stockRepository: StockRepository;
  let service: StockService;

  const stock: IStock = {
    name: 'testProduct',
    quantity: 1,
    price: 5.55
  };

  beforeEach(async () => {
    stockRepository = new StockRepository();

    service = new StockService(stockRepository);
  });

  it('should create a stock', async () => {
    jest.spyOn(stockRepository, 'insert').mockImplementationOnce(stock => Promise.resolve({ ...stock } as any));

    const result = await service.save(stock);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(stock);
  });

  it('should update a stock', async () => {
    jest.spyOn(stockRepository, 'findById').mockResolvedValueOnce({ id: 1 } as any);
    jest.spyOn(stockRepository, 'update').mockImplementationOnce(stock => Promise.resolve({ ...stock } as any));

    const result = await service.save({ id: 1, ...stock });

    expect(result).not.toBeFalsy();
    expect(result).toEqual({ id: 1, ...stock });
  });

  it('should throw NotFoundException when try update a not found stock', async () => {
    jest.spyOn(stockRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.save({ id: 1, ...stock });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should remove a stock', async () => {
    jest.spyOn(stockRepository, 'findById').mockResolvedValueOnce({ id: 2 } as any);
    jest.spyOn(stockRepository, 'remove').mockResolvedValueOnce({ id: 2 } as any);

    await service.remove(2);
  });

  it('should throw NotFoundException when try to remove a not found stock', async () => {
    jest.spyOn(stockRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.remove(2);
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
