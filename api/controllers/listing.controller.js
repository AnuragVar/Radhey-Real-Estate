import { Property } from "../models/Property.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
      throw new ApiError(401, "Unauthorized Access!!");
    }

    const listings = await Property.find({ userRef: req.params.id });
    console.log(listings);
    res
      .status(200)
      .json(
        new ApiResponse(200, listings, "listings are successfully fetched!!")
      );
  } catch (error) {
    next(error);
  }
};
