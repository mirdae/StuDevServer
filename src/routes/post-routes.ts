import { Router } from 'express';
import { createPost } from '../service/post-service';
import { decodeJWT } from '../middleware/decode-jwt';

const router = Router();

router.post('/', decodeJWT, createPost);

export default router;
