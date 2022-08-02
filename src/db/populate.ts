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
    for (let index = 0; index < 2000; index++) {
      await userRepository.create({
        'firstName': `${index}User`,
        'lastName': `${index}U`,
        'email': `j.kowalski${index}@example.com`,
        'phoneNumber': `048 11111${index}`,
        'password': '1234567890'
      }).save();
    }
    return dataSource;
  }).then(async dataSource => {
    const userRepository = dataSource.getRepository(Item);
    for (let index = 0; index < 10000; index++) {
      await userRepository.create({
        'name': `Item${index}`,
        'category': { 'name': `Main${index%10}` },
        'priceNetto': 100 + index,
        'VAT': 23,
        'excise': null,
        'overhead': 13,
        'available': index % 3 != 1
      }).save();
    }
    return dataSource;
  }).then(async dataSource => {
    const userRepository = dataSource.getRepository(Order);
    for (let index = 0; index < 40000; index++) {
      await userRepository.create({
        dateOfOrder: new Date(132483479873),
        client: { id: randomInt(1000) },
        items: [
          { id: randomInt(10000) },
          { id: randomInt(10000) },
          { id: randomInt(10000) },
          { id: randomInt(10000) }
        ],
        orderInvoiceFileURI: `<location>/${index}`, 
      }).save();
    }
    return dataSource;
  }).then((ds) => ds.destroy()));
  res.send(200);
}