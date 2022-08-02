import {
  NextFunction, Request, Response 
} from 'express';
import { verify } from 'jsonwebtoken';
import { appConfig } from '../config';

export default function verifyToken(
  req: Request,
  res: Response, 
  next: NextFunction
)  {
  next();
  return;
  try{
    const token = (req.headers.authorization || '').split(' ')[1];
    if (token) {
      const verifiedToken = verify(token, appConfig.secret);
      if (typeof(verifiedToken) !== 'string' && verifiedToken.prm === 'all') {
        next();
        return;
      }
      res.status(401);
      res.send({ message: 'Incapable to verify' }); 
    }} catch(e) {
    res.status(500);
    res.send({ message: 'Internal problem' }); 
  }
  next('router');
}