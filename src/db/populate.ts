import { DataSource } from 'typeorm';
import { dbConfig } from '../config';
import {
  Item, ItemCategory, Order, User 
} from './model';

export default async function populate(req,res){ try {
  const AppDataSource = new DataSource(dbConfig);
  await AppDataSource.initialize();
  switch (req.query.table){
  case 'users':
    const userRepository = AppDataSource.getRepository(User);
    const userTable: Array<User> = [];
    for (let index = 0; index < 100; index++) {
      userTable.push(userRepository.create({
        'firstName': `${index}User`,
        'lastName': `${index}U`,
        'email': `j.kowalski${index}@example.com`,
        'phoneNumber': `048 11111${index}`,
        'password': '1234567890'
      }));
    }
    await userRepository.save(userTable);
    break;
  case 'itemCategories':
    const itemCategoryRepository = AppDataSource.getRepository(ItemCategory);
    const itemCat: Array<ItemCategory> = [];
    for (let index = 0; index < 5; index++) {
      itemCat.push(itemCategoryRepository.create({
        'name': `Main${index}`,
        parentCategory: null
      }));
    }
    await itemCategoryRepository.save(itemCat);
    break;
  case 'items':
    const itemRepository = AppDataSource.getRepository(Item);
    const items: Array<Item> = [];
    for (let index = 0; index < 1000; index++) {
      items.push(itemRepository.create({
        'name': `Item${index}`,
        'category': { 'name': `Main${index%5}` },
        'priceNetto': 100 + index,
        'VAT': 23,
        'excise': null,
        'overhead': 13,
        'available': index % 3 != 1
      }));
    }
    await itemRepository.save(items);
    break;
  case 'orders':
    const orderRepository = AppDataSource.getRepository(Order);
    const orders: Order[] = [];
    const randomInt = (n) => Math.floor(Math.random()*n) + 1;
    for (let index = 0; index < 1000; index++) {
      orders.push(orderRepository.create({
        dateOfOrder: new Date(1324834798),
        dateOfRealization: null,
        client: { id: randomInt(100) },
        items: [
          { id: randomInt(999) },
          { id: randomInt(999) },
          { id: randomInt(999) },
          { id: randomInt(999) }
        ],
        orderInvoiceFileURI: `<location>/${index}`, 
      }));
    }
    await orderRepository.save(orders);
  }
  await AppDataSource.destroy();
  res.status(200);
  res.send('OK');
} catch(e) {
  res.status(500);
}}