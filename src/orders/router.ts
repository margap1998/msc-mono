import {
  Request,
  Response,
  Router 
} from 'express';
import verifyToken from '../auth/verify';
import {
  addOrder, deleteOrder, getOrderBy, updateOrder 
} from '../db/controller';
import { GetOrderRequest, OrderRequest } from '../types';

async function getOrders(req: Request, res: Response) {
  const orderID = req.params.orderID;

  const order: GetOrderRequest
    = orderID ? { id: parseInt(orderID) }: {};
  
  const skip = parseInt((req.query.skip || '0').toString());
  const take = parseInt((req.query.take || '20').toString());

  try {
    const orders = await getOrderBy(order, skip, take);
    res.status(200);
    res.send(orders);
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}

async function postOrders(req: Request, res: Response) {
  const newOrder: OrderRequest = {
    ...req.body,
    dateOfOrder: new Date(req.body.dateOfOrder)
  };
  try {
    const order = await addOrder(newOrder);
    res.status(201);
    res.send(order);
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}
async function patchOrder(req: Request, res: Response) {
  const newOrderData: OrderRequest = {
    ...req.body,
    dateOfOrder: req.body.dateOfOrder? new Date(req.body.dateOfOrder): undefined
  };
  const orderID = req.params.orderID;
  const order: GetOrderRequest
    = orderID ? { id: parseInt(orderID) }: {};
  try {
    const updated = await updateOrder(order, newOrderData);
    res.status(updated && 200 || 404);
    res.send(updated);
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}
async function deleteOrderHandler(req: Request, res: Response) {
  const orderID = req.params.orderID;
  const order = orderID ? { id: parseInt(orderID) }: {};
  try {
    const deleteResult = await deleteOrder(order);
    if (deleteResult.affected){
      res.status(200);
      res.send(order);
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

export default function getOrderRouter(
  prefix: string,
  routerPrefix = '/orders'
) {
  const router = Router();
  router.use(verifyToken);
  router.get(`${prefix}${routerPrefix}`, getOrders);
  router.post(`${prefix}${routerPrefix}`, postOrders);
  router.get(`${prefix}${routerPrefix}/:orderID`, getOrders);
  router.patch(`${prefix}${routerPrefix}/:orderID`, patchOrder);
  router.delete(`${prefix}${routerPrefix}/:orderID`, deleteOrderHandler);
  return router;
}
