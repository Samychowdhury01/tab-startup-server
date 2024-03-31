import {  TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const getSingleUserFromDB = async (payload: string) => {
  const result = await User.findById(payload);

  if (result === null) {
    throw new Error('No user found');
  }
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getSingleUserFromDB,
};
