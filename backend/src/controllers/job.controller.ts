import { NextFunction, Request, Response, Router } from "express";
import auth from "../utils/auth";
// import { createJob } from "../services/job.service";
import { updateApplication } from "../services/application.service";
import { getCurrentUser } from "../services/auth.service";

const router = Router();

/**
 * Create an job
 * @auth required
 * @route {get} /job
 * @bodyparam none
 * @returns jobs
 */
router.get(
  "/job",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobs = req.auth.user.jobs;

      res.json(jobs);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Create a job
 * @auth required
 * @route {create} /job
 * @bodyparam job Job
 * @returns job Job
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

export default router;
