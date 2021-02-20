import { Router } from 'express';
import {
  signUp,
  signIn,
  duplicateIdCheck,
  duplicateNicknameCheck,
} from '../service/user-service';

const router = Router();

type SignUpUserBody = {
  socialId: string;
  password: string;
  nickname: string;
  email: string;
};

router.post('/signin', signIn);
router.post('/check/id', duplicateIdCheck);
router.post('/check/nickname', duplicateNicknameCheck);
router.post('/', signUp);

export default router;
