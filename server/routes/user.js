import express from 'express';
import { getUser, updateUser } from '../controllers/users.js';
import {checkToken} from "../middleware/tokenValidation.js";

const router = express.Router();

router.get('/get-user', getUser);
router.put('/update-user',checkToken, updateUser);

export default router