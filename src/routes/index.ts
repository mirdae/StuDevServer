import { Router } from 'express';
import userRouter from './user-routes';
import postRouter from './post-routes';

const router = Router();

router.use('/user', userRouter);
router.use('/post', postRouter);

export default router;
