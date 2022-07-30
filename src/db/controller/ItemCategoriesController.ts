
import { ItemCategory } from '../model';
import { AppDataSource } from '../dataSource';
import { GetItemCategoryRequest, ItemCategoryRequest } from '../../types';

export async function getItemCategoryBy(
  depth?: number,
  itemCategory?: GetItemCategoryRequest,
) {
  const itemRepository = AppDataSource.getTreeRepository(ItemCategory);
  if (itemCategory.name) {
    const root = await itemRepository.findOneBy(itemCategory);
    return [await itemRepository.findDescendantsTree(root, { depth })];
  }
  return await itemRepository.findTrees({ depth });
}

export function addItemCategory(itemCategory: ItemCategoryRequest){
  const itemRepository = AppDataSource.getRepository(ItemCategory);
  return itemRepository.create(itemCategory).save();
}
export function deleteItemCategory(itemCategory: GetItemCategoryRequest){
  const itemRepository = AppDataSource.getTreeRepository(ItemCategory);
  return itemRepository.delete(itemCategory);
}
export async function updateItemCategory(
  itemCategory: GetItemCategoryRequest,
  updateItem: ItemCategoryRequest
){
  const itemRepository = AppDataSource.getRepository(ItemCategory);
  const existingItems = await getItemCategoryBy(0, itemCategory);
  if (existingItems.length < 1) {
    return null;
  }
  return await itemRepository.update(itemCategory, updateItem);
}
