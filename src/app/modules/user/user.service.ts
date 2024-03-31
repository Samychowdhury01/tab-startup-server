import {  TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const email = User.findOne( {email : payload.email} );
  console.log(email);
  if (!!email){
    throw new Error('Email already exists');
  } 
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
