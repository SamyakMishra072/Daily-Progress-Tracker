import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

router.post('/register', register);  // you can register once via Postman
router.post('/login', login);

export default router;
