import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserRepo } from '../repository/user-repository';
import { createJWT } from '../utils/jwt';

export const signUp = async (req: Request, res: Response) => {
  const { socialId, password, nickname, email } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const insertId = await UserRepo.createUser(socialId, hash, nickname, email);
    return res.status(201).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'fail', error });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { socialId, password } = req.body;
  try {
    const result = await UserRepo.findBySocialId(socialId);
    if (!result) {
      return res.status(200).json({ message: '없는 사용자 입니다.' });
    }
    // 비밀번호 확인
    const comparePW = await bcrypt
      .compare(password, result.hash)
      .then((res: any) => res);

    if (!comparePW) {
      return res.status(200).json({ message: '비밀번호가 틀렸습니다.' });
    }

    delete result.hash;
    // token만들어서 브라우저에 넘기기
    const token = createJWT(result.id);
    return res
      .cookie('auth', token)
      .status(200)
      .json({ message: 'success', user: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'fail', error });
  }
};
