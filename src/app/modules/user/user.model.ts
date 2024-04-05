import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);


// custom static method to find out the user exist or not using email
userSchema.statics.isUserExist = async function (email: string) {
  const user = await User.findOne({ email });
  return user;
};

// Method to hash the password before saving it
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc

  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password when sending the response
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
