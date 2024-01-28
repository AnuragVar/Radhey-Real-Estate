import { ApiError } from "../utils/ApiError.js";
import bcryptjs from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

export const test = function (req, res) {
  res.json({ message: "done" });
};

export const userUpdate = async (req, res, next) => {
  console.log(1);
  if (req.user.id !== req.params.id) {
    throw new ApiError("You can only update your own account!!");
  }
  console.log("hi");
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    console.log(req.user.id);

    console.log(req.user);
    console.log(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          userName: req.body?.userName,
          email: req.body?.email,
          password: req.body?.password,
          avatar: req.body?.avatar,
        },
      },
      { new: true }
    );
    console.log("hi");
    console.log("hi");
    const { password, ...info } = updatedUser._doc;
    res
      .status(200)
      .json(new ApiResponse(200, info, "user updated successfully!!"));
  } catch (error) {
    next(error);
    return;
  }
};
