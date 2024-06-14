import express from "express";
import {register, login, refresh, logout} from '../controllers/auth.js';
import {checkToken} from "../middleware/tokenValidation.js";
import {checkRefreshToken} from "../middleware/refreshTokenValidation.js";
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",checkToken,logout);
router.get("/refresh",checkRefreshToken, refresh);

export default router;