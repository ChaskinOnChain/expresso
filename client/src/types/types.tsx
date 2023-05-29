import { Types } from "mongoose";

export interface ApiRequestRegister {
  img?: any;
  adminPassword?: string | undefined;
  username: string;
  email: string;
  password: string;
  ethereum_address: string;
  role: "" | "user" | "admin";
  [key: string]: any;
}

export interface ApiRequestLogin {
  email: string;
  password: string;
}

export interface User {
  img: any;
  username: string;
  email: string;
  ethereum_address: string;
  role: "" | "user" | "admin";
  token: string;
  [key: string]: any;
}

export interface FormProps {
  isLogin: boolean;
}

export interface Comment {
  _id: Types.ObjectId;
  comment: string;
}

export interface Blog {
  title: string;
  Author?: string;
  date: string;
  content: string;
  tags?: string[];
  comments: Comment[];
}
