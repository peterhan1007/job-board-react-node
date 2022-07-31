import { NextFunction, Request, Response, Router } from "express";
import auth from "../utils/auth";
// import { createJob } from "../services/job.service";
import {
  updateApplication,
  applyRequest,
  getApplies,
} from "../services/application.service";

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

router.post(
  "/accept",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jobId, id, userId } = req.body;

      const apply = await applyRequest(jobId, id, userId);
      res.json(apply);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/applies",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applies = await getApplies();

      res.json(applies);
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
