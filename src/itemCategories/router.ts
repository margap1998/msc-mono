
import {
  Request,
  Response,
  Router 
} from 'express';
import {
  getItemCategoryBy,
  addItemCategory,
  updateItemCategory,
  deleteItemCategory,
} from '../db/controller';
import { ItemCategoryRequest } from '../types';
import { GetItemCategoryRequest } from '../types';
async function getItemCategorys(req: Request, res: Response) {
  const name = req.params.name;
  const depth = parseInt(req.query.depth.toString()|| '0');
  const itemCategory: GetItemCategoryRequest
    = name ? { name }: {};
  try {
    const itemCategorys = await getItemCategoryBy(depth, itemCategory);
    res.status(200);
    res.send(itemCategorys);
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}

async function postItemCategorys(req: Request, res: Response) {
  const newItemCategory: ItemCategoryRequest = req.body;
  try {
    const itemCategory = await addItemCategory(newItemCategory);
    res.status(201);
    res.send(itemCategory);
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}
async function patchItemCategory(req: Request, res: Response) {
  const newItemCategoryData: ItemCategoryRequest = req.body;
  const name = req.params.name;
  const itemCategory: GetItemCategoryRequest
    = name ? { name }: {};
  try {
    const updated = await updateItemCategory(itemCategory, newItemCategoryData);
    res.status(updated && 200 || 404);
    res.send(updated);
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}
async function deleteItemCategoryHandler(req: Request, res: Response) {
  const name = req.params.name;
  const itemCategory: GetItemCategoryRequest
    = name ? { name }: {};
  try {
    const deleteResult = await deleteItemCategory(itemCategory);
    if (deleteResult.affected){
      res.status(200);
      res.send(itemCategory);
      return;
    }
    res.status(400);
    res.send({ message: 'Not deleted' });
    return;
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}
export default function getItemCategoryRouter(
  prefix: string,
  routerPrefix = '/itemCategories'
) {
  const router = Router();
  router.get(`${prefix}${routerPrefix}`, getItemCategorys);
  router.post(`${prefix}${routerPrefix}`, postItemCategorys);
  router.get(`${prefix}${routerPrefix}/:name`, getItemCategorys);
  router.patch(
    `${prefix}${routerPrefix}/:name`,
    patchItemCategory
  );
  router.delete(`${prefix}${routerPrefix}/:name`, deleteItemCategoryHandler);
  return router;
}
