import express from "express";
import{addLikes, getLikes, deleteLikes} from "../controllers/likes.js";
import {checkToken} from "../middleware/tokenValidation.js";

const router = express.Router();

router.post("/",checkToken,addLikes);
router.get("/",checkToken,getLikes);
router.delete("/",checkToken,deleteLikes);

export default router;