import prisma from "../docs/prisma-client";
import { User } from "@prisma/client";
import { userInfo } from "os";

export const getUsers = async (): Promise<Array<User>> => {
  const users = await prisma.user.findMany();

  return users;
};

export const updateUser = async (name: string, approved: number) => {
  const userId = await prisma.user.findFirst({
    where: {
      name,
    },
    select: {
      id: true,
    },
  });

  const user = await prisma.user.update({
    where: {
      ...userId,
    },
    data: {
      approved: !approved,
    },
    select: {
      name: true,
      role: true,
      title: true,
      description: true,
      approved: true,
      rate: true,
    },
  });

  return user;
};
