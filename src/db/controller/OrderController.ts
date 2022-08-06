import { Order } from '../model';
import { AppDataSource } from '../dataSource';
import { OrderRequest } from '../../types';
import { GetOrderRequest } from '../../types';

export function getOrderBy(
  order: GetOrderRequest = {},
  skip?: number,
  take?: number
) {
  let orderQuery = AppDataSource.createQueryBuilder(Order, 'order');
  orderQuery = orderQuery
    .leftJoinAndSelect('order.items', 'item')
    .leftJoinAndSelect('order.client', 'user');
  order.id && (orderQuery = orderQuery.where('order.id = :id', order));
  return orderQuery.skip(skip).take(take).getMany();
}

export function addOrder(order: OrderRequest | OrderRequest[]){
  const orderRepository = AppDataSource.getRepository(Order);
  if (Array.isArray(order)) {
    const orders = orderRepository.create(order);
    orderRepository.save(orders);
  } else {
    return orderRepository.create(order).save();
  }
}
export function deleteOrder(order: GetOrderRequest){
  const orderRepository = AppDataSource.getRepository(Order);
  return orderRepository.delete(order);
}
export async function updateOrder(
  order: GetOrderRequest,
  updateOrder: OrderRequest
){
  const orderRepository = AppDataSource.getRepository(Order);
  const existingOrders = await getOrderBy(order);
  if (existingOrders.length < 1) {
    return null;
  }
  return await orderRepository.update(order, updateOrder);
}