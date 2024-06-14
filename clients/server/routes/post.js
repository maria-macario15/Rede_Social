import express from "express";
import{creatPost,getPost} from "../controllers/post.js";
import {checkToken} from "../middleware/tokenValidation.js";

const router = express.Router();

router.post("/",checkToken,creatPost);
router.get("/",checkToken,getPost);

export default router;