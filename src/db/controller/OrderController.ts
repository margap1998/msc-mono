import { Order } from '../model';
import { AppDataSource } from '../dataSource';
import { OrderRequest } from '../../types';
import { GetOrderRequest } from '../../types';

export function getOrderBy(
  order: GetOrderRequest = {},
  skip?: number,
  take?: number
) {
  const orderRepository = AppDataSource.getRepository(Order);
  return orderRepository.find({
    where: order,
    skip,
    take
  });
}

export function addOrder(order: OrderRequest){
  const orderRepository = AppDataSource.getRepository(Order);
  return orderRepository.create(order).save();
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