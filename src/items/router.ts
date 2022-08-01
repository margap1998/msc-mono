
import {
  Request,
  Response,
  Router 
} from 'express';
import {
  getItemBy,
  addItem,
  updateItem,
  deleteItem,
} from '../db/controller';
import { ItemRequest } from '../types';
import { GetItemRequest } from '../types';
async function getItems(req: Request, res: Response) {
  const itemID = req.params.itemID;
  const item: GetItemRequest
    = itemID ? { id: parseInt(itemID) }: {};
  try {
    const items = await getItemBy(item);
    res.status(200);
    res.send(items);
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}

async function postItems(req: Request, res: Response) {
  const newItem: ItemRequest = req.body;
  try {
    const item = await addItem(newItem);
    res.status(201);
    res.send(item);
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}
async function patchItem(req: Request, res: Response) {
  const newItemData: ItemRequest = req.body;
  const itemID = req.params.itemID;
  const item: GetItemRequest
    = itemID ? { id: parseInt(itemID) }: {};
  try {
    const updated = await updateItem(item, newItemData);
    res.status(updated && 200 || 404);
    res.send(updated);
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}
async function deleteItemHandler(req: Request, res: Response) {
  const itemID = req.params.itemID;
  const item = itemID ? { id: parseInt(itemID) }: {};
  try {
    const deleteResult = await deleteItem(item);
    if (deleteResult.affected){
      res.status(200);
      res.send(item);
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
export default function getItemRouter(
  prefix: string,
  routerPrefix = '/items'
) {
  const router = Router();
  router.get(`${prefix}${routerPrefix}`, getItems);
  router.post(`${prefix}${routerPrefix}`, postItems);
  router.get(`${prefix}${routerPrefix}/:itemID`, getItems);
  router.patch(
    `${prefix}${routerPrefix}/:itemID`,
    patchItem
  );
  router.delete(`${prefix}${routerPrefix}/:itemID`, deleteItemHandler);
  return router;
}
