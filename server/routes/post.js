import express from "express";
import{creatPost,getPost} from "../controllers/post.js";

const router = express.Router();

router.post("/",creatPost);;
router.get("/",getPost);

export default router;