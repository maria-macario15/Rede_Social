import express from "express";
import{addFrindShip, getFrindShip, deleteFrindShip} from "../controllers/frindShip.js";
import {checkToken} from "../middleware/tokenValidation.js";

const router = express.Router();

router.post("/",checkToken,addFrindShip);
router.get("/",checkToken,getFrindShip);
router.delete("/",checkToken,deleteFrindShip);

export default router;