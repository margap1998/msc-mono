import { randomInt } from 'crypto';
import { DataSource } from 'typeorm';
import { dbConfig } from '../config';
import {
  Item, Order, User 
} from './model';
export default async function populate(req, res){
  const AppDataSource = new DataSource(dbConfig);

  await (AppDataSource.initialize().then(async dataSource => {
    const userRepository = dataSource.getRepository(User);
    const userTable: Array<User> = [];
    for (let index = 0; index < 2000; index++) {
      userTable.push(userRepository.create({
        'firstName': `${index}User`,
        'lastName': `${index}U`,
        'email': `j.kowalski${index}@example.com`,
        'phoneNumber': `048 11111${index}`,
        'password': '1234567890'
      }));
    }
    await userRepository.save(userTable);
    return dataSource;
  }).then(async dataSource => {
    const userRepository = dataSource.getRepository(Item);
    const items: Array<Item> = [];
    for (let index = 0; index < 10000; index++) {
      items.push(userRepository.create({
        'name': `Item${index}`,
        'category': { 'name': `Main${index%10}` },
        'priceNetto': 100 + index,
        'VAT': 23,
        'excise': null,
        'overhead': 13,
        'available': index % 3 != 1
      }));
    }
    await userRepository.save(items);
    return dataSource;
  }).then(async dataSource => {
    const userRepository = dataSource.getRepository(Order);
    const orders: Order[] = [];
    for (let index = 0; index < 40000; index++) {
      orders.push(userRepository.create({
        dateOfOrder: new Date(132483479873),
        client: { id: randomInt(1000) },
        items: [
          { id: randomInt(10000) },
          { id: randomInt(10000) },
          { id: randomInt(10000) },
          { id: randomInt(10000) }
        ],
        orderInvoiceFileURI: `<location>/${index}`, 
      }));
    }
    userRepository.save(orders);
    return dataSource;
  }).then((ds) => ds.destroy()));
  res.send(200);
}