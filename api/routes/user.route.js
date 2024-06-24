import Router from "express";
import {
  test,
  userUpdate,
  deleteUser,
  signOut,
  getUser
} from "../controllers/user.controller.js";
import { verifyJWT } from "../utils/verifyJWT.js";

const router = Router();

router
  .get("/test", test)
  .post("/update/:id", verifyJWT, userUpdate)
  .delete("/delete/:id", verifyJWT, deleteUser)
  .get("/:id",getUser);
router.get("/sign-out/:id", verifyJWT, signOut);

export default router;
