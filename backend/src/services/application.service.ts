import prisma from "../docs/prisma-client";
import HttpException from "../models/http-exception.model";
import { Application, ApplyRequest } from "@prisma/client";
import { SelfApplication } from "../models/application.model";

export const createApplication = async (
  input: Application,
  ownerId: Number
): Promise<SelfApplication> => {
  const { content, rate } = input;

  if (!content) {
    throw new HttpException(422, { errors: { title: ["can't be blank"] } });
  }

  const application = await prisma.application.create({
    data: {
      content,
      rate: Number(rate),
      user: {
        connect: {
          id: Number(ownerId),
        },
      },
    },
    select: {
      content: true,
      rate: true,
    },
  });

  return application;
};

export const updateApplication = async (
  applicationPayload: Application,
  updateId: number
) => {
  const { content, rate } = applicationPayload;

  const application = await prisma.application.update({
    where: {
      id: updateId,
    },
    data: {
      content,
      rate: Number(rate),
    },
    select: {
      content: true,
      rate: true,
    },
  });

  return application;
};

export const applyRequest = async (
  jobId: number,
  id: number,
  userId: number
) => {
  const applyRequest = await prisma.applyRequest.create({
    data: {
      jobId: Number(jobId),
      clientId: Number(id),
      userId: Number(userId),
    },
    select: {
      jobId: true,
      clientId: true,
      userId: true,
    },
  });

  return applyRequest;
};

export const getApplies = async () => {
  const applies = await prisma.applyRequest.findMany();

  console.log("here: ", applies);
  return applies;
};
