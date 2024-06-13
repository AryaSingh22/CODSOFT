import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { updateUserController } from '../controllers/userController.js';

const router = express.Router()

//GET USERS || GET

//UPGRADE USER || PUT

router.put('/update-user',userAuth,updateUserController)
export default router;