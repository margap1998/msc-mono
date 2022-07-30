import { Router } from 'express';

function sendTODO(req, res){
  res.statusCode = 501;
  res.send('TODO AUTH');
}


export default function getUserRouter(prefix: string, routerPrefix = '/auth') {
  const router = Router();
  router.post(`${prefix}${routerPrefix}`, sendTODO);
  return router;
}
