import {
  NextFunction, Request, Response 
} from 'express';
import { UserRequest } from '../types';

export function validateUser(checkProps: Array<string>) {
  return (
    req:Request,
    res:Response,
    next: NextFunction
  ) =>{
    const {
      firstName, lastName, email, phoneNumber, password
    }: UserRequest = req.body;
    const badRequest = (property?) => {
      res.status(400);
      res.send({ property });
      throw new Error(property);
    };
    if (checkProps.includes('firstName') && 
      (firstName.length < 1 || firstName.length > 255)
    ) {
      badRequest('firstName');
    }
    if (checkProps.includes('password') && 
      (password.length < 8 || password.length > 255)
    ) {
      badRequest('password');
    }
    if (checkProps.includes('lastName') && 
      (lastName.length < 1 || lastName.length > 255)
    ) {
      badRequest('lastName');
    }
    if (checkProps.includes('email') && 
      email.match(/^[a-z0-9.]+@[a-z0-9.]+\.[a-z]{2,}$/)?.length !== 1
    ) {
      badRequest('email');
    }
    if (checkProps.includes('phoneNumber') && 
      phoneNumber.match(/^0[0-9]{1,3}\s[0-9]{5,}$/)?.length !== 1
    ){
      badRequest('phoneNumber');
    }
    next();
  };
}

export const validateUserPost 
  = validateUser(['firstName', 'lastName', 'email', 'phoneNumber', 'password']);

export function validateUserPatch (
  req:Request,
  res:Response,
  next: NextFunction
) {
  const keys = Object.keys(req.body);
  validateUser(keys)(req, res, next);
}