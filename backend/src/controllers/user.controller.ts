import { NextFunction, Request, Response, Router } from "express";
import auth from "../utils/auth";
import { getUsers, updateUser } from "../services/user.service";
import { getCurrentUser } from "../services/auth.service";

const router = Router();

/**
 * get users
 * @auth required
 * @route {get} /users
 * @bodyparam none
 * @returns jobs
 */
router.get(
  "/users",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/user",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await updateUser(req.body.name, req.body.approved);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/getProfileWithToken",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getCurrentUser(req.auth.name);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
