import jwt from 'jsonwebtoken';

export const createJWT = (id: number): string => {
  return jwt.sign({ id }, 'token');
};

//export const verifyJWT = async (token: string): Promise<User | null> => {};
