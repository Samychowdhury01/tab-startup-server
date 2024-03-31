import bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { ObjectId } from 'mongoose';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExist(payload?.email);

  if (!user) {
    throw new Error('Email does not exist');
  }

  // matching the provided password with hashed password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid Password');
  }

  return { userId: user?._id };
};

const logoutUser = async (userId: string) => {
  const isExist = await User.findById({ _id: userId });

  if (!isExist) {
    throw new Error(`The user with id doesn't exists`);
  }

  const logout = await User.findByIdAndUpdate(
    { _id: userId },
    { isLoggedIn: false },
  );
  if (logout) {
    return true;
  } else {
    return false;
  }
};

export const AuthServices = {
  loginUser,
  logoutUser,
};
