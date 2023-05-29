import mongoose, { Document } from "mongoose";

interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  img?: Buffer;
  email: string;
  password: string;
  blogs?: mongoose.Types.ObjectId[];
  role: "admin" | "user";
}

export type UserDocument = IUser & Document;

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
