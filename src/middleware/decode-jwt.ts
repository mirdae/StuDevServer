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
  // 쿠키로받는거 변경하기...! 쿠키에 다른값들도 있으면 에러발생함
  const token = req.headers.cookie.split('=')[1];
  if (token) {
    const user = await verifyJWT(token);
    req.user = user;
    next();
  }
  return;
};
