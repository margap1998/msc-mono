import { User } from '../model';
import { AppDataSource } from '../dataSource';
import { UserRequest } from '../../types';
import { GetUserRequest } from '../../types/get-requests/GetUserRequest';

export function getUserBy(
  user: GetUserRequest = {},
  select: Array<keyof User>
  = ['id', 'firstName', 'lastName', 'email', 'orders'],
  skip: number = undefined,
  take: number = undefined
) {
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.find({
    select,
    where: user,
    skip,
    take
  });
}

export function addUser(user: UserRequest){
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.create(user).save();
}
export function deleteUser(user: GetUserRequest){
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.delete(user);
}
export async function updateUser(user: GetUserRequest, updateUser: UserRequest){
  const userRepository = AppDataSource.getRepository(User);
  const existingUsers = await getUserBy(user);
  if (existingUsers.length < 1) {
    return null;
  }
  return await userRepository.update(user, updateUser);
}