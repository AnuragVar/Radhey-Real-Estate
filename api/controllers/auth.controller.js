import bcryptjs from "bcryptjs";

import { User } from "../models/user.models.js";
import { nextTick } from "process";
import { ApiError } from "../utils/ApiError.js";

const signup = async function (req, res, next) {
  const { userName, email, password } = req.body;

  const hassedPassword = bcryptjs.hashSync(password, 10);

  const newUser = User({ userName, email, password: hassedPassword });
  try {
    await newUser.save();
    res.status(200).json("User created successfully");
  } catch (error) {
    next(new ApiError(500, error.message || "Something wents wrong!!"));
  }
};
export { signup };
