import express from "express";
import { verifyJWT } from "../utils/verifyJWT.js";
import {
  createListing,
  getListings,
} from "../controllers/listing.controller.js";
const router = express.Router();
router.route("/create").post(verifyJWT, createListing);
router.route("/listings/:id").get(verifyJWT, getListings);

export default router;
