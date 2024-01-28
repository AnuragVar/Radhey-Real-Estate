import { ApiError } from "../utils/ApiError.js";
import bcryptjs from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";

export const test = function (req, res) {
  res.json({ message: "done" });
};

export const userUpdate = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    throw new ApiError("You can only update your own account!!");
  }
  try {
    if (req.body.password) {
      const hassedPassword = bcryptjs.hashSync(req.body.password, 10);
    }

    console.log(req.user);
    console.log(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req?.body?.userName,
          email: req?.body?.email,
          password: hassedPassword || password,
          avatar: req?.body?.avatar,
        },
      },
      { new: true }
    );
    console.log("hi");
    const { password, ...info } = updatedUser._doc;
    res.status(200).json(new ApiResponse(200, "user updated successfully!!"));
  } catch (error) {
    next(error);
    return;
  }
};
