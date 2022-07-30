import {
  Request,
  Response,
  Router 
} from 'express';
import {
  getUserBy,
  addUser,
  updateUser,
  deleteUser,
} from '../db/controller';
import { UserRequest } from '../types';
import { GetUserRequest } from '../types';
import { validateUserPatch, validateUserPost } from './validators';

async function getUsers(req: Request, res: Response) {
  const userID = req.params.userID;
  const user: GetUserRequest
    = userID ? { id: parseInt(userID) }: {};
  user.isActive = true;
  try {
    const users = await getUserBy(user);
    res.status(200);
    res.send(users);
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}

async function postUsers(req: Request, res: Response) {
  const newUser: UserRequest = req.body;
  try {
    const user = await addUser(newUser);
    res.status(201);
    res.send(user);
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}
async function patchUser(req: Request, res: Response) {
  const newUserData: UserRequest = req.body;
  const userID = req.params.userID;
  const user: GetUserRequest
    = userID ? { id: parseInt(userID) }: {};
  user.isActive = true;
  try {
    const updated = await updateUser(user, newUserData);
    res.status(updated && 200 || 404);
    res.send(updated);
  } catch(e) {
    res.status(500);
    console.log(e);
    res.send({ message: e.detail });
  }
}
async function deleteUserHandler(req: Request, res: Response) {
  const userID = req.params.userID;
  const user = userID ? { id: parseInt(userID) }: {};
  try {
    const deleteResult = await deleteUser(user);
    if (deleteResult.affected){
      res.status(200);
      res.send(user);
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
export default function getUserRouter(prefix: string, routerPrefix = '/users') {
  const router = Router();
  router.get(`${prefix}${routerPrefix}`, getUsers);
  router.post(`${prefix}${routerPrefix}`, validateUserPost, postUsers);
  router.get(`${prefix}${routerPrefix}/:userID`, getUsers);
  router.patch(
    `${prefix}${routerPrefix}/:userID`,
    validateUserPatch,
    patchUser
  );
  router.delete(`${prefix}${routerPrefix}/:userID`, deleteUserHandler);
  return router;
}
