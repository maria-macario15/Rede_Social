import express from "express";
import{addFriendShip, getFriendShip, deleteFriendShip} from "../controllers/friendShip.js";
import {checkToken} from "../middleware/tokenValidation.js";

const router = express.Router();

router.post("/",checkToken,addFriendShip);
router.get("/",checkToken,getFriendShip);
router.delete("/",checkToken,deleteFriendShip);

export default router;