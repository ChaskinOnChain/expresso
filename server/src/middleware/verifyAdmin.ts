import { NextFunction, Request, Response } from "express";

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(400);
    throw new Error("Unathorized!");
  }
  if (req.user.role === "user") {
    throw new Error("Not Authorized");
  }
  next();
};

export default verifyAdmin;
