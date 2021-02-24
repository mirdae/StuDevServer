import { Router } from 'express';
import {
  signUp,
  signIn,
  duplicateIdCheck,
  duplicateNicknameCheck,
  authByToken,
} from '../service/user-service';
import { decodeJWT } from '../middleware/decode-jwt';

const router = Router();

type SignUpUserBody = {
  socialId: string;
  password: string;
  nickname: string;
  email: string;
};

router.get('/auth', decodeJWT, authByToken);
router.post('/signin', signIn);
router.post('/check/id', duplicateIdCheck);
router.post('/check/nickname', duplicateNicknameCheck);
router.post('/', signUp);

export default router;
