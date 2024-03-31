import bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';


const loginUser = async (payload: TLoginUser) => {

  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error('Email does not exist');
  }

  // matching the provided password with hashed password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  console.log(isPasswordMatched, payload?.password);
  if(!isPasswordMatched){
    throw new  Error("Invalid Password");
  }

  return {userId : user?._id} 


};

export const AuthServices = {
  loginUser,
};
