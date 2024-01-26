import Router from "express";

import { signup } from "../controllers/auth.controller.js";
import { signIn } from "../controllers/auth.controller.js";

const router = Router();
router.route("/sign-up").post(signup);
router.route("/sign-in").post(signIn);
export default router;
