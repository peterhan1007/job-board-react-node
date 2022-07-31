import prisma from "../docs/prisma-client";
import HttpException from "../models/http-exception.model";
import { Job, User } from "@prisma/client";
import { SelfJob } from "../models/job.model";

export const createJob = async (
  input: Job,
  ownerId: number
): Promise<SelfJob> => {
  const { title, description, rate, status } = input;

  if (!title) {
    throw new HttpException(422, { errors: { title: ["can't be blank"] } });
  }

  const job = await prisma.job.create({
    data: {
      title,
      description,
      rate: Number(rate),
      approved: false,
      status,
      userId: ownerId,
    },
    select: {
      title: true,
      description: true,
      rate: true,
      status: true,
    },
  });

  return job;
};

export const getJobs = async (input: string): Promise<Array<Job>> => {
  if (!input) {
    throw new HttpException(422, { errors: { title: ["can't be blank"] } });
  }

  const jobs = await prisma.job.findMany({
    where: {
      user: {
        name: input,
      },
    },
  });

  return jobs;
};

export const updateJob = async (title: string, approved: number) => {
  const jobId = await prisma.job.findFirst({
    where: {
      title,
    },
    select: {
      id: true,
    },
  });

  const job = await prisma.job.update({
    where: {
      ...jobId,
    },
    data: {
      approved: !approved,
    },
    select: {
      title: true,
    },
  });

  return job;
};
