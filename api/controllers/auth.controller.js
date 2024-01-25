import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const signup = async function (req, res, next) {
  const { userName, email, password } = req.body;

  const hassedPassword = bcryptjs.hashSync(password, 10);

  const newUser = User({ userName, email, password: hassedPassword });
  try {
    await newUser.save();
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};
export { signup };

export const signIn = async function (req, res, next) {
  try {
    const { email, password, userName } = req.body;

    if ([email, userName, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "all fields are required");
    }

    const existedUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (!existedUser) throw new ApiError(400, "User doesn't exist");

    const isValidPassword = bcryptjs.compareSync(
      password,
      existedUser.password
    );

    if (!isValidPassword) throw new ApiError(400, "Password is wrong!!");

    const token = jwt.sign(
      { id: existedUser._id },
      process.env.JWT_SECRET_TOKEN
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    const { password: pass, ...info } = existedUser._doc;
    res
      .cookie("access_token", token, options)
      .status(200)
      .json(new ApiResponse(200, info, "user is logged successfully"));
  } catch (error) {
    next(error);
  }
};
