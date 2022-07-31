import { NextFunction, Request, Response, Router } from "express";
import auth from "../utils/auth";
import { createJob, getJobs, updateJob } from "../services/client.service";
import { findUserIdByName, getCurrentUser } from "../services/auth.service";

const router = Router();

/**
 * Create a job
 * @auth required
 * @route {POST} /users
 * @bodyparam user User
 * @returns user User
 */
router.post(
  "/job",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = await findUserIdByName(req.auth.name);
      const user = await createJob(req.body, Number(userId.id));
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * get jobs
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
      let jobs;
      const currentUser = await getCurrentUser(req.auth.name as string);

      if (currentUser.role === "FREELANCER")
        jobs = await prisma.job.findMany({
          where: {
            approved: true,
          },
        });
      else if (currentUser.role === "CLIENT") {
        jobs = await getJobs(req.auth.name);
      } else {
        jobs = await prisma.job.findMany();
      }

      res.json(jobs);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/job",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobs = await updateJob(req.body.title, req.body.approved);
      res.json(jobs);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
