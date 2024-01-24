import bcryptjs from "bcryptjs";

import { User } from "../models/user.models.js";

const signup = async function (req, res) {
  const { userName, email, password } = req.body;

  const hassedPassword = bcryptjs.hashSync(password, 10);

  const newUser = User({ userName, email, password: hassedPassword });
  try {
    await newUser.save();
    res.status(200).json("User created successfully");
  } catch (error) {
    res.status(500).json(error.message || "Something went wrong!!");
  }
};
export { signup };
