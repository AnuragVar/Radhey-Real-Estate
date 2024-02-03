import express from "express";
import { verifyJWT } from "../utils/verifyJWT.js";
import {
  createListing,
  getListings,
  deleteList,
} from "../controllers/listing.controller.js";
const router = express.Router();
router.route("/create").post(verifyJWT, createListing);
router.route("/listings/:id").get(verifyJWT, getListings);
router.route("/delete/:id").delete(verifyJWT, deleteList);
export default router;
