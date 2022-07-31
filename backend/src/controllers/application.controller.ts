import { NextFunction, Request, Response, Router } from "express";
import auth from "../utils/auth";
import {
  createApplication,
  updateApplication,
} from "../services/application.service";
import { findUserIdByName } from "../services/auth.service";
import { getApplications } from "../services/client.service";

const router = Router();

/**
 * Create an user
 * @auth none
 * @route {POST} /users
 * @bodyparam user User
 * @returns user User
 */
router.post(
  "/application",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = await findUserIdByName(req.auth.name);
      const user = await createApplication(req.body, userId.id);
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
  "/application/:id",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await updateApplication(req.body, Number(req.params.id));
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/applications",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applications = await getApplications(req.query.title as string);

      res.json(applications);
    } catch (error) {
      next(error);
    }
  }
);
export default router;
