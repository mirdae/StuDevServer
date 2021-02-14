import { Router } from 'express';

const router = Router();

type SignUpUserBody = {
  socialId: string;
  password: string;
  nickname: string;
  email: string;
};

router.post('/', (req, res) => console.log(req));

export default router;
