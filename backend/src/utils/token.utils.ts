import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const generateToken = (user: Partial<User>): string =>
  jwt.sign(user, process.env.JWT_SECRET || "password", { expiresIn: "60d" });

export default generateToken;
