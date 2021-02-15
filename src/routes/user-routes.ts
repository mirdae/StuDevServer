import { Router } from 'express';
import { signUp, signIn } from '../service/user-service';

const router = Router();

type SignUpUserBody = {
  socialId: string;
  password: string;
  nickname: string;
  email: string;
};

router.post('/signin', signIn);
router.post('/', signUp);

export default router;
