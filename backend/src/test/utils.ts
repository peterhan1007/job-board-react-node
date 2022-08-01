import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

type User = {
  name: string;
  password: string;
};

export const generateToken = (user: User) => {
  return jwt.sign(
    { name: user.name, password: user.password },
    process.env.JWT_SECRET as string
  );
};
