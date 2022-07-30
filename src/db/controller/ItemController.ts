import { Item } from '../model';
import { AppDataSource } from '../dataSource';
import { ItemRequest } from '../../types';
import { GetItemRequest } from '../../types';

export function getItemBy(
  item: GetItemRequest = {},
  skip?: number,
  take?: number
) {
  const itemRepository = AppDataSource.getRepository(Item);
  return itemRepository.find({
    where: item,
    skip,
    take
  });
}

export function addItem(item: ItemRequest){
  const itemRepository = AppDataSource.getRepository(Item);
  return itemRepository.create(item).save();
}
export function deleteItem(item: GetItemRequest){
  const itemRepository = AppDataSource.getRepository(Item);
  return itemRepository.delete(item);
}
export async function updateItem(item: GetItemRequest, updateItem: ItemRequest){
  const itemRepository = AppDataSource.getRepository(Item);
  const existingItems = await getItemBy(item);
  if (existingItems.length < 1) {
    return null;
  }
  return await itemRepository.update(item, updateItem);
}