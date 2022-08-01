import {
  Router, Request, Response 
} from 'express';
import { getUserBy } from '../db/controller';
import { sign } from 'jsonwebtoken';
import { appConfig } from '../config';

async function loginHandler(req: Request, res: Response) {
  try {
    const user = (await getUserBy(req.body, ['email', 'password']))[0];
    console.log(user);
    if (user.password === req.body.password) {
      const token =
        sign({ prm: 'all' }, appConfig.secret, { expiresIn: 60*60*24 });
      res.status(200);
      res.send({ token });
    } else {
      res.status(401);
      res.send({ message: 'Incorrect password/e-mail' });
    }
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}

export default function getAuthRouter(prefix: string, routerPrefix = '/auth') {
  const router = Router();
  router.post(`${prefix}${routerPrefix}/login`, loginHandler);
  return router;
}
