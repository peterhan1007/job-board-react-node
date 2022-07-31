import { NextFunction, Request, Response, Router } from "express";
import auth from "../utils/auth";
import {
  createUser,
  getCurrentUser,
  login,
  updateProfile,
  updateUser,
} from "../services/auth.service";

const router = Router();

/**
 * Create an user
 * @auth none
 * @route {POST} /users
 * @bodyparam user User
 * @returns user User
 */
router.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await createUser(req.body);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Login
 * @auth none
 * @route {POST} /users/login
 * @bodyparam user User
 * @returns user User
 */
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await login(req.body);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Get current user
 * @auth required
 * @route {GET} /user
 * @returns user User
 */
router.get(
  "/user",
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getCurrentUser(req.body.user?.name as string);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Update user
 * @auth required
 * @route {PUT} /user
 * @bodyparam user User
 * @returns user User
 */
router.put(
  "/user",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await updateUser(req.body, req.body.name?.name as string);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/profile",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await updateProfile(req.body, req.auth.name?.name as string);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
