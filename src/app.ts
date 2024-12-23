import { Router } from 'express';
import getUserRouter from './users/router';
import getItemRouter from './items/router';
import getOrderRouter from './orders/router';
import getAuthRouter from './auth/router';
import populate from './db/populate';
import getItemCategoryRouter from './itemCategories/router';

export function app(prefix = '/api') {
  const router = Router();
  router.get(prefix, (req, res) => {
    res.send({ message: 'Hello' });
    res.status(200);
  });
  router.use(getUserRouter(prefix));
  router.use(getItemRouter(prefix));
  router.use(getOrderRouter(prefix));
  router.use(getAuthRouter(prefix));
  router.use(getItemCategoryRouter(prefix));
  router.post('/populate', populate);
  return router;
}
