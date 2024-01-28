import express from "express";
import { verifyJWT } from "../utils/verifyJWT.js";
import { createListing } from "../controllers/listing.controller.js";
const router = express.Router();
router.route("/create").post(verifyJWT, createListing);

export default router;
