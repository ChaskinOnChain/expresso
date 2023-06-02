import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, role, ethereum_address, adminPassword } =
    req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Missing username, email, or password");
  }
  if (role === "admin") {
    if (adminPassword !== "BLOGORDIE") {
      res.status(401);
      throw new Error("You are not an admin");
    }
  }

  if (!req.file) {
    res.status(400);
    throw new Error("No image file uploaded");
  }

  const imgBuffer = req.file.buffer;

  const newUser = new User({
    username,
    email,
    password,
    role,
    ethereum_address,
    img: imgBuffer,
  });
  await newUser.save();
  res.status(200).json({ message: "Sign up successful" });
});

const logIn = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Missing email or password");
  }

  const preUser = await User.findOne({ email });

  if (!preUser || !(await bcrypt.compare(password, preUser.password))) {
    res.status(401);
    throw new Error("Wrong login info");
  }

  const token = jwt.sign(
    { id: preUser._id.toString() },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );

  const user = await User.findOne({ email }).select("-password");

  res.status(200).json({ user, token });
});

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const { username, email, password, ethereum_address } = req.body;
    console.log(req.body);
    if (!username && !email && !password && !req.file && !ethereum_address) {
      res.status(400);
      throw new Error("Nothing to update");
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(400);
      throw new Error("No user");
    }
    if (req.file) {
      const imgBuffer = req.file.buffer;
      user.img = imgBuffer;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.ethereum_address = ethereum_address || user.ethereum_address;

    const savedUser = await user.save();
    res.status(200).json({ message: "Info updated", data: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400);
      throw new Error("No user");
    }
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};

const viewUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .select("-password")
    .populate("blogs", "title date tags img");

  res.status(200).json({ data: user });
});

const viewUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({ data: users });
});

export { signUp, logIn, updateUserInfo, deleteUser, viewUsers, viewUser };
