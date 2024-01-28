import Router from "express";
import { test, userUpdate } from "../controllers/user.controller.js";
import { verifyJWT } from "../utils/verifyJWT.js";

const router = Router();

router.get("/test", test);
export default router;

router.patch("/update/:id", verifyJWT, userUpdate);
