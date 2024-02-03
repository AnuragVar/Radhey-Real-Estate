import { application } from "express";
import { Property } from "../models/Property.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

export const createListing = async (req, res, next) => {
  try {
    console.log(req.user);
    console.log(req.body);
    const {
      name,
      description,
      address,
      type,
      parking,
      furnished,
      offer,
      bedrooms,
      bathrooms,
      discountPrice,
      regularPrice,
      userRef,
      imageUrls,
    } = req.body;

    if ([name, description, address].some((field) => field.trim() === "")) {
      throw new ApiError(400, "Name,Description and Address are required!!");
    }
    console.log(imageUrls);
    const property = await Property.create({
      name,
      description,
      address,
      type,
      parking,
      furnished,
      offer,
      bedrooms,
      bathrooms,
      discountPrice,
      regularPrice,
      userRef,
      imageUrls,
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, property, "Property is listed successfully!!")
      );
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    console.log(req.user.id, req.params.id);
    if (req.user.id !== req.params.id) {
      next("unauthorized Access");
    }

    const listings = await Property.find({ userRef: req.params.id });
    // console.log(listings);
    if (!listings) {
      next("error");
      console.log(3);
    }
    res
      .status(200)
      .json(
        new ApiResponse(200, listings, "listings are successfully fetched!!")
      );
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (req, res, next) => {
  try {
    const id = req.params.id;

    const listing = await Property.findById({ _id: id });
    console.log(listing);
    if (!listing) throw new ApiError(404, "No listing occurs!!");
    console.log(2);
    if (!new mongoose.Types.ObjectId(req.user.id).equals(listing.userRef)) {
      console.log(req.user.id);
      console.log(listing.userRef);
      console.log("d");
      throw new ApiError(404, "Unauthorized Access!!");
    }
    console.log(3);
    const response = await Property.deleteOne({ _id: id });
    console.log(response);
    if (!response) {
      throw new ApiError(500, "There is some server issue!!");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "List deleted successfully!!"));
  } catch (error) {
    next(error);
  }
};
