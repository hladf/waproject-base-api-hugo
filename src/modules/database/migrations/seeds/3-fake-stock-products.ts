import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { IStock } from 'modules/database/interfaces/stock';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const oldProducts = await knex
    .count()
    .from('Stock')
    .first();

  if (Number(oldProducts.count) > 0) return;

  for (let x = 0; x < 50; x++) {
    const name = faker.commerce.product();
    const quantity = faker.random.number(10);
    const price = Number(faker.commerce.price(1.1, 9.9, 2));

    const product: IStock = {
      name,
      quantity,
      price,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex
      .del()
      .insert(product)
      .into('Stock');
  }
}
