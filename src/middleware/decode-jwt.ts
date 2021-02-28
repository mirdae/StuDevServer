import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt';
import { User } from '../repository/user-repository';

export interface IGetUserAuthInfoRequest extends Request {
  user: User;
}

export const decodeJWT = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.cookie.split('=')[1];
    if (token) {
      const user = await verifyJWT(token);
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(200).json({ message: 'fail', error });
  }
};
