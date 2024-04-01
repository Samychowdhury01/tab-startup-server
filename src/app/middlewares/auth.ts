import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req?.headers.authorization;

    if (!token) {
      throw new Error('Authentication is required');
    }
    const verifyToken = jwt.verify(
      token as string,
      config.jwt_access_secret as string,
      async (err, decoded) => {
        if (err) {
          return next(err); // Return after calling next with an error
        }
        // If the token is valid, set req.user and call next()
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
