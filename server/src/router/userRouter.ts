import express from "express";
import {
  deleteUser,
  logIn,
  signUp,
  updateUserInfo,
  viewUser,
  viewUsers,
} from "../controllers/userControllers";
import verifyJWT from "../middleware/verifyJWT";
import verifyAdmin from "../middleware/verifyAdmin";
import { deletePostOrComment } from "../controllers/blogControllers";
import uploadMiddleware from "../middleware/uploadMiddleware";

const userRouter = express.Router();

userRouter.route("/signup").post(uploadMiddleware.single("img"), signUp);
userRouter.route("/login").post(logIn);
userRouter
  .route("/me")
  .put(uploadMiddleware.single("img"), verifyJWT, updateUserInfo)
  .delete(verifyJWT, deleteUser);
userRouter.route("/:id").get(verifyJWT, viewUser);
userRouter.route("/blog/:id").delete(verifyJWT, deletePostOrComment);

const adminRouter = express.Router();

adminRouter.route("/").get(verifyJWT, verifyAdmin, viewUsers);

export { userRouter, adminRouter };
