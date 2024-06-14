import express from "express";
import{creatComment,getComment} from "../controllers/comment.js";
import {checkToken} from "../middleware/tokenValidation.js";

const router = express.Router();

router.post("/",checkToken,creatComment);
router.get("/",checkToken,getComment);

export default router;