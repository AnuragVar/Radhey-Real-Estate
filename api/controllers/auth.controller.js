import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const options = {
  httpOnly: true,
  secure: true,
};
const signup = async function (req, res, next) {
  try {
    const { userName, email, password } = req.body;

    if ([userName, email, password].some((field) => !field?.trim())) {
      console.log(2);
      throw new ApiError(400, "All fields are required!!");
    }
    //all fields are required

    if (!email.trim().includes("@"))
      throw new ApiError(400, "Email is incorrect!!");
    //validating email

    const existedUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (existedUser) throw new ApiError(400, "User already existed!!");
    //user already exist or not

    const hassedPassword = bcryptjs.hashSync(password, 10);

    const newUser = User({ userName, email, password: hassedPassword });

    await newUser.save();
    const { password: pass, ...info } = newUser._doc;

    res
      .status(200)
      .json(new ApiResponse(200, info, "User created successfully"));
  } catch (error) {
    next(error);
  }
};
export { signup };

export const signIn = async function (req, res, next) {
  try {
    const { email, password, userName } = req.body;
    //taking credentials from body
    //validate them - empty, email format
    //check for the existing user
    //check the password with the password of the user
    //assigning a token to them
    //findOne
    //
    if (!email && !userName)
      throw new ApiError(400, "Atleast email or username is required!!!");
    // if ([email, userName, password].some((field) => field?.trim() === "")) {
    //   throw new ApiError(400, "all fields are required");
    // }

    const existedUser = await User.findOne({
      $or: [{ userName }, { email }],
      // userName,
    });

    if (!existedUser) throw new ApiError(400, "User doesn't exist");

    const isValidPassword = bcryptjs.compareSync(
      password,
      existedUser.password
    );

    if (!isValidPassword) throw new ApiError(400, "Password is wrong!!");

    const token = jwt.sign(
      { id: existedUser._id },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "2d" }
    );

    const { password: pass, ...info } = existedUser._doc;
    res
      .cookie("access_token", token, options)
      .status(200)
      .json(new ApiResponse(200, info, "user is logged successfully"));
  } catch (error) {
    // throw new ApiError(500, error.message || "Something wrong happens!!");
    next(error);
  }
};

export const signInThroughGoogle = async (req, res, next) => {
  try {
    const { userName, email, photo } = req.body;
    console.log(userName, email, photo);
    const existedUser = await User.findOne({
      email,
    });
    console.log(2);
    if (existedUser) {
      const token = jwt.sign(
        { id: existedUser._id },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "2d" }
      );
      console.log(existedUser);
      console.log(3);
      const { password, ...info } = existedUser._doc;

      res
        .cookie("access_token", token, options)
        .status(200)
        .json(new ApiResponse(200, info, "user is logged successfully"));
    } else {
      const generatePassword =
        Math.random.toString(36).slice(-8) + Math.random.toString(36).slice(-8);
      const hassedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = await User.create({
        userName:
          userName.split(" ").join("").toLowerCase() +
          Math.random.toString(36).slice(-4),
        email,
        password: hassedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET_TOKEN,
        {
          expiresIn: "2d",
        }
      );

      const { password, ...info } = newUser._doc;

      res
        .cookie("access_token", token, options)
        .status(200)
        .json(new ApiResponse(200, info, "user is logged successfully"));
    }
  } catch (error) {
    next(error);
  }
};

const profileUpdate = async (req, res, next) => {
  const { userName, email, password, id } = req.body;
  const existedUser = await User.findOne({ id });
  if (!existedUser) {
    throw new ApiError(500, "Something went wrong while fetching User Data");
  }
  if (userName?.trim() !== "") existedUser.userName = userName;
  if (email?.trim() !== "") existedUser.email = email;
  if (password?.trim() !== "") {
    const hassedPassword = bcryptjs.hashSync(password, 10);
    existedUser.password = hassedPassword;
  }

  await existedUser.save();
  return existedUser;
};
