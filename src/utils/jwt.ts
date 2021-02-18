import jwt from 'jsonwebtoken';
import { UserRepo } from '../repository/user-repository';

export const createJWT = (id: number): string => {
  return jwt.sign({ id }, 'token');
};

export const verifyJWT = async (token: string) => {
  const verifyResult: any = jwt.verify(token, 'token');
  if (!verifyResult) {
    return null;
  }

  const { id } = verifyResult;
  return await UserRepo.findById(id);
};
