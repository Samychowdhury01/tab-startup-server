import bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  const isEmailExist = await User.isUserExist(payload?.email);

  if (!isEmailExist) {
    throw new Error('Email does not exist');
  }

  // matching the provided password with hashed password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isEmailExist?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid Password');
  }

  const jwtPayload = {
    userId: isEmailExist?._id,
    email: isEmailExist?.email,
  };

  // creating a token and sent to the client
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '7d',
  });
  
  return accessToken
};



export const AuthServices = {
  loginUser,
};
