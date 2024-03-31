import { Model } from "mongoose";

export interface IUser  {
  [x: string]: any;
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  isLoggedIn?: boolean;
};

export interface UserModel extends Model<IUser> {
  isUserExist(email : string): Promise<IUser>;
}