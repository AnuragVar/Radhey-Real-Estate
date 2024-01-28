import { Property } from "../models/Property.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createListing = async (req, res, next) => {
  try {
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
    } = req.body;

    if ([name, description, address].some((field) => field.trim() === "")) {
      throw new ApiError(400, "Name,Description and Address are required!!");
    }
    if (!type)
      throw new ApiError(
        400,
        "Atleast one amoung sell or rent field is required!!"
      );

    const property = await Property.create({
      regularPrice,
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
    });

    await property.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, property, "Property is listed successfully!!")
      );
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
};
